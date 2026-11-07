# Launcher PWA — Todo Celulares

Launcher web moderno (PWA) para celular e TV, com fundo de vídeo, ícones oficiais, categorias, favoritos e relógio.

## ✨ Funcionalidades

- 🎬 **Fundo de vídeo** (planeta.mp4 em loop, 2x velocidade)
- 🎨 **Ícones oficiais** (Simple Icons) — WhatsApp, YouTube, Instagram, GitHub, etc.
- 🕐 **Relógio** no topo (HH:MM, atualiza a cada segundo)
- 📂 **Categorias**: Todos, Favoritos, Comunicação, Mídia, Ferramentas, Social
- ⭐ **Favoritos** salvos no navegador (localStorage)
- 🔍 **Busca** por nome
- 📱 **PWA** — instala como app, funciona offline (Service Worker)
- 🌐 **Funciona em qualquer celular** via navegador

## 🚀 Como usar

### Desenvolvimento local
```powershell
git clone https://github.com/gptecnologiasite-bot/launcher-todo-celulares.git
cd launcher-todo-celulares
npm install
npm run dev -- --host
```

### No celular
1. Conecte o celular na mesma Wi-Fi do PC
2. Abra o Chrome e acesse `http://<IP-DO-PC>:5173`
3. Menu (⋮) → "Adicionar à tela inicial"
4. Use o ícone do PWA (tela cheia, sem barra do navegador)

### Via ADB (celular conectado por USB)
```powershell
adb reverse tcp:5173 tcp:5173
adb shell am start -a android.intent.action.VIEW -d "http://localhost:5173"
```

## 📁 Estrutura do projeto

```
launcher-todo-celulares/
├── index.html          # HTML + meta tags PWA + Material Symbols
├── public/
│   ├── planeta.mp4     # Vídeo de fundo
│   ├── fundo.jpg       # Imagem de fundo (fallback)
│   ├── manifest.json   # PWA manifest
│   └── sw.js           # Service Worker (offline)
├── src/
│   ├── App.jsx         # Componente principal
│   ├── App.css         # Estilos (fundo, grid, animações)
│   └── main.jsx        # Entry point + SW registration
└── package.json
```

## 🔧 Personalização

### Adicionar mais apps
Edite `src/App.jsx` → array `APPS`:
```js
{ name: "Meu App", url: "https://...", icon: "https://cdn.simpleicons.org/slug/white", color: "#HEX", cat: "tools" }
```

### Trocar o vídeo de fundo
Coloque o novo vídeo em `public/` e altere o `src` no `App.jsx`:
```jsx
<source src="/meu-video.mp4" type="video/mp4" />
```

### Ajustar velocidade do vídeo
```jsx
ref={(v) => { if (v) v.playbackRate = 2; }}  // 2x
```

## 📱 Compatibilidade

- ✅ Android (Chrome) — Samsung, Xiaomi, Motorola, etc.
- ✅ iOS (Safari) — PWA funciona em tela cheia
- ✅ Celulares antigos (Android 6-8) — CSS simplificado, fallback de imagem

## 🛠️ Tecnologias

- React 18 + Vite
- Simple Icons (CDN)
- Service Worker (PWA)
- CSS (animações, grid responsivo)

## 📄 Licença

MIT — livre para uso e modificação.

---

Criado com Claude Code.
