import streamlit as st
import streamlit.components.v1 as components
import os

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

# Check if the file exists
if os.path.exists(html_filename):
    with open(html_filename, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # We must patch the relative paths for images in streamlit if needed, 
    # but since streamlit runs relative to the current working directory,
    # and the files are loaded inside st.components.v1.html,
    # let's write out the HTML inside the component.
    # Note: st.components.v1.html renders in an iframe. To make sure it fits
    # we specify a generous height with scrolling enabled.
    
    components.html(html_content, height=1400, scrolling=True)
else:
    st.error(f"Error: No se encontró el archivo '{html_filename}'. Verifica que los archivos HTML estén en la raíz de tu repositorio de GitHub.")
