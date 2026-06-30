import streamlit as st
import streamlit.components.v1 as components
import os
import subprocess
import re

# Set page config for a widescreen experience
st.set_page_config(
    page_title="Martis Academy - Plataforma Educativa",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom styling to clean up the Streamlit interface (hiding header, footer, etc.)
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        .stDeployButton {display: none;}
        div.block-container {
            padding: 0rem;
            max-width: 100%;
        }
        iframe {
            border: none;
            width: 100%;
        }
    </style>
""", unsafe_allow_html=True)

# Sidebar title & Navigation
st.sidebar.markdown("# 🎓 Martis Academy")
st.sidebar.markdown("### Navegación de Páginas")

# Map page names to their respective HTML files
pages_map = {
    "🏠 Inicio / Home": "index.html",
    "📚 Nuestros Cursos": "cursos.html",
    "📅 Cronograma de Admisión": "cronograma.html",
    "🏫 Institutos Públicos": "institutos.html",
    "📝 Mini-Simulador Gratis": "simulador.html",
    "💰 Planes y Precios": "planes.html",
    "📞 Contacto y Soporte": "contacto.html",
    "🖼️ Galería de Admisiones": "galeria.html"
}

# Radio button menu in the sidebar
selected_page = st.sidebar.radio("Selecciona una sección:", list(pages_map.keys()))

# Get the path to the HTML file
html_filename = pages_map[selected_page]

# Dynamic height based on page content length to optimize visual aesthetics
heights_map = {
    "index.html": 2000,
    "cursos.html": 1600,
    "cronograma.html": 2800,
    "institutos.html": 1800,
    "simulador.html": 1500,
    "planes.html": 1500,
    "contacto.html": 1800,
    "galeria.html": 3200
}
page_height = heights_map.get(html_filename, 1600)

# Check if the file exists
if os.path.exists(html_filename):
    # 1. Read HTML content
    with open(html_filename, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # 2. Inline CSS (styles.css) for full layout and color rendering inside sandbox iframe
    if os.path.exists("styles.css"):
        with open("styles.css", "r", encoding="utf-8") as f:
            css_content = f.read()
        # Replace the stylesheet link with the inlined style tag
        html_content = html_content.replace(
            '<link rel="stylesheet" href="styles.css">',
            f'<style>{css_content}</style>'
        )

    # 3. Inline JS (app.js) for tabs, simulators, and lists rendering
    if os.path.exists("app.js"):
        with open("app.js", "r", encoding="utf-8") as f:
            js_content = f.read()
        # Replace the script tag with the inlined script tag
        html_content = html_content.replace(
            '<script src="app.js"></script>',
            f'<script>{js_content}</script>'
        )

    # 4. Resolve GitHub Raw assets for images when deployed on streamlit.app
    try:
        repo_url = subprocess.check_output(["git", "config", "--get", "remote.origin.url"]).decode().strip()
        branch = subprocess.check_output(["git", "rev-parse", "--abbrev-ref", "HEAD"]).decode().strip()
    except Exception:
        repo_url = ""
        branch = "main"

    github_match = re.search(r"github\.com[:/]([^/]+)/([^.]+)", repo_url)
    if github_match:
        username = github_match.group(1)
        repo = github_match.group(2)
        # Parse SSH URL to standard repo name if needed
        repo = repo.replace(".git", "")
        raw_base = f"https://raw.githubusercontent.com/{username}/{repo}/{branch}/"
        # Replace all instances of local images folder path with the GitHub raw URL path
        html_content = html_content.replace("IMAGENES/", f"{raw_base}IMAGENES/")

    components.html(html_content, height=page_height, scrolling=True)
else:
    st.error(f"Error: No se encontró el archivo '{html_filename}'. Verifica que los archivos HTML estén en la raíz de tu repositorio de GitHub.")
