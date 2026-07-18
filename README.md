# ❤️ Mariana & Pedro — 3 Anos de Namoro ✨

<div align="center">
  <p>
    <strong>Uma experiência web interativa, minimalista com toques de luxo e alta imersão cinemática.</strong>
  </p>
  <p>
    Desenvolvida com <b>Next.js 16 (App Router)</b>, <b>GSAP ScrollTrigger</b>, <b>Three.js (GLTF 3D)</b> e <b>Lenis Smooth Scroll</b> para celebrar 3 anos de uma história de amor inesquecível.
  </p>
</div>

---

## 🌹 Sobre o Projeto

Este projeto foi criado com o objetivo de homenagear e eternizar os 3 anos de relacionamento entre **Mariana e Pedro** (*desde 18 de Julho de 2023*). Fugindo de layouts estáticos convencionais, a aplicação foi projetada como uma **jornada narrativa interativa guiada pelo scroll**, onde cada rolagem revela memórias, declarações e surpresas tridimensionais em um ambiente elegante, romântico e minimalista.

### 💎 Filosofia de Design e Estética
* **Paleta Curada de Luxo**: Tons profundos de vinho/rubi (`#2C0000` e `#170000`) em harmonia com tipografias brancas puras e sobreposições escuras texturizadas com flores.
* **Tipografia Clássica & Romântica**: Combinação equilibrada entre a elegância serifada clássica (**Cormorant Garamond**) para textos líricos e a delicadeza caligráfica manuscrita (**Parisienne**) para títulos e assinaturas.
* **Glassmorphism & Micro-animações**: Cartões translúcidos com desfoque de fundo (`backdrop-blur`), bordas sutis iluminadas e respostas visuais fluidas ao toque e ao mouse.

---

## ✨ Destaques e Funcionalidades Exclusivas

### 🌊 1. Preloader Interativo (`Preloader`)
* **Coração Líquido Animado**: Um SVG com recorte em formato de coração que se enche com ondas líquidas rubi dinâmicas em tempo real.
* **Contador ao Vivo**: Exibição da porcentagem de carregamento (`0%` até `100%`) com transição suave.
* **Abertura em Cortina Lateral**: Ao concluir, retângulos verticais se recolhem horizontalmente para a esquerda (`scaleX: 0`), revelando a seção inicial de forma cinematográfica.

### 🎥 2. Hero Cinematográfico (`Hero`)
* **Vídeo Romântico de Fundo**: Reprodução contínua e desacelerada (`0.8x`) de buquês e flores em alta definição (`/video-flowers-hero.mp4`).
* **Cartão Glassmorphism**: Cartão flutuante centralizado com título principal e botão interativo de rolagem.
* **Pin & Stagger Transition**: Fixação da tela e descida em cascata de colunas retangulares que conectam com suavidade à próxima seção.

### 💌 3. Carta com Narração de Voz e Música (`Message`)
* **Reprodutor Áudio/Voz Integrado**: Player de voz interativo com botão de play/pause para narração da carta de amor, barra de progresso visual simulando ondas e controle de volume.
* **Trilha Sonora Ambiente**: Opção para ouvir música romântica de fundo enquanto se lê a mensagem.

### 📸 4. Galeria Dinâmica de Memórias (`Gallery`)
* **Grid e Rolagem Orquestrada via GSAP**: Apresentação de fotos marcantes do casal em layouts dinâmicos com animações de entrada e zoom suave nos cartões.

### ⏳ 5. Contador de Tempo ao Vivo (`Counter`)
* **Cronômetro de Alta Precisão**: Cálculo em tempo real dos **anos, meses, dias, horas, minutos e segundos** exatos passados desde o início do namoro em **18/07/2023**.
* **Efeitos Visuais**: Corações flutuantes em partículas (`CSS/GSAP`) ao redor dos números pulsantes.

### 💎 6. Palavras 3D e Coração Giratório (`Words3D`)
* **Efeito Letra por Letra (Scrub via Scroll)**: Revelação progressiva e irregular de letras das palavras-chave do casal (`Amor Puro`, `Companheirismo`, `Boboquices`) conforme o usuário rola a página.
* **Objeto 3D Imponente (`Three.js / R3F`)**: Carregamento de um coração low-poly 3D (`low_poly_spinning_heart.glb`) que desce do topo girando suavemente acima das palavras.
* **Explosão Cinematográfica Final**: Ao término da leitura das palavras, o coração 3D avança diretamente para a câmera (`escala 6x` e `Z: 5.35`), preenchendo toda a tela para transicionar até o componente seguinte.

### 📜 7. Carta Aberta (`Letter`) & 🌹 Rodapé de Luxo (`Footer`)
* **Declaração Final**: Seção dedicada para expressar gratidão e promessas de futuro.
* **Footer Personalizado**: Fundo escurecido com textura floral (`image-footer-flowers.png`), frase de finalização lírica, direitos reservados no lado esquerdo e logo oficial no lado direito (`LOGO-COMPLETA-BRANCA.png`).

### ⚡ 8. Barra de Rolagem Flutuante & Lenis (`CustomScrollbar` + `SmoothScroll`)
* **Ocultação da Barra Nativa**: Remoção total das barras de rolagem convencionais do navegador.
* **Barra Flutuante Desprendida**: Trilho em tom cinza claro/prateado elegante posicionado junto ao canto direito, desprendido das extremidades, com pontas arredondadas (`rounded-full`).
* **Indicador Brilhante em Tempo Real**: Linha branca pura com sombra neon que cresce progressivamente (`scaleY`) indicando a porcentagem exata percorrida.
* **Click-to-Scroll**: Possibilidade de clicar em qualquer ponto do trilho lateral para rolar automaticamente até aquela parte da história.

### 🚫 9. Página 404 Romântica e Exclusiva (`not-found.tsx`)
* Página de erro customizada com fundo lírico floral, animação de entrada escalonada (`stagger`) e o botão glassmorphism `← VOLTAR PARA A NOSSA HISTÓRIA`.

---

## 🛠️ Stack Tecnológica

O projeto faz uso do que há de mais moderno no ecossistema front-end para garantir performance absurda, animações a `60fps` e tipagem estática segura:

| Tecnologia | Função / Aplicação |
| :--- | :--- |
| **[Next.js 16](https://nextjs.org/)** | Framework React com **App Router**, otimização de imagens, vídeos e fontes nativas (`next/font`). |
| **[React 19](https://react.dev/)** | Biblioteca core com Server/Client components e gerenciamento de estado moderno. |
| **[TypeScript](https://www.typescriptlang.org/)** | Tipagem estática para robustez no desenvolvimento e prevenção de erros em tempo de build. |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Estilização utilitária de ponta, variáveis CSS customizadas e design responsivo. |
| **[GSAP (GreenSock)](https://gsap.com/)** | Animações de nível profissional, `ScrollTrigger` para animações amarradas à rolagem e `@gsap/react`. |
| **[Lenis Smooth Scroll](https://lenis.studio/)** | Motor de rolagem suave com inércia física perfeitamente sincronizada com o GSAP. |
| **[Three.js](https://threejs.org/) / R3F** | Renderização 3D via `@react-three/fiber` e `@react-three/drei` (`GLTFLoader`) para o coração 3D giratório. |
| **[Lucide React](https://lucide.dev/)** | Ícones vetoriais modernos e limpos utilizados nos players de áudio e interfaces. |

---

## 📁 Estrutura do Projeto

```text
3-years-m-p/
├── app/
│   ├── globals.css          # Variáveis globais, reset de barra de rolagem e fontes personalizadas
│   ├── layout.tsx           # Layout raiz com SmoothScroll (Lenis) e CustomScrollbar
│   ├── not-found.tsx        # Página 404 customizada romântica
│   └── page.tsx             # Página principal orquestrando todos os componentes em sequência
├── components/
│   ├── counter/             # Cronômetro em tempo real do tempo de relacionamento
│   ├── custom-scrollbar/    # Barra de rolagem flutuante de luxo com interatividade click-to-scroll
│   ├── footer/              # Rodapé com fundo floral, frase final e logo
│   ├── gallery/             # Galeria animada de fotos do casal
│   ├── hero/                # Seção de introdução com vídeo de fundo e transição em escada
│   ├── letter/              # Carta de amor lírica para rolagem
│   ├── message/             # Carta interativa com player de áudio/voz e música
│   ├── preloader/           # Tela de carregamento com coração líquido e wipe em cortina
│   ├── smooth-scroll/       # Configuração e provider do Lenis com integração ao GSAP
│   └── words-3d/            # Seção com palavras reveladas pelo scroll e coração 3D giratório
└── public/
    ├── low_poly_spinning_heart.glb  # Modelo 3D do coração giratório
    ├── video-flowers-hero.mp4       # Vídeo romântico em loop do Hero
    ├── LOGO-COMPLETA-BRANCA.png     # Logo oficial para o Footer
    └── image-*.png                  # Imagens e texturas florais do projeto
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão 18.17 ou superior)
* `npm`, `yarn`, `pnpm` ou `bun`

### Passo a Passo

1. **Clone o repositório ou navegue até o diretório do projeto**:
   ```bash
   cd c:/Users/wk/Work-Projects/3-years-M-P/3-years-m-p
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   Abra [http://localhost:3000](http://localhost:3000) para visualizar o projeto em execução.

### Build de Produção
Para compilar e validar a versão otimizada de produção com verificação completa de tipos e otimização estática:
```bash
npm run build
npm run start
```

---

<div align="center">
  <p>Feito com infinitas doses de carinho, dedicação e código para celebrar <b>Mariana & Pedro</b> ❤️</p>
  <p><i>18 de Julho de 2023 — Para Todo o Sempre</i></p>
</div>
