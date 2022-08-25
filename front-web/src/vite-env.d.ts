/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />


interface ImportMetaEnv {
    readonly VITE_MAPBOX_ACCESS_TOKEN: string
    readonly VITE_BASE_API_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  