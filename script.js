const availableProjects = new Map(
  [
    {
      name: "Ana Rodrigues",
      entryPath: "./sites/ana-rodrigues/index.html",
      preview: "./previews/ana-rodrigues.jpg",
    },
    {
      name: "Anna Carvalho",
      entryPath: "./sites/anna-carvalho/index.html",
      preview: "./previews/anna-carvalho.jpg",
    },
    {
      name: "Beatriz Henriques",
      entryPath: "./sites/beatriz-henriques/welcometothevibe2.html",
      preview: "./previews/beatriz-henriques.jpg",
    },
    {
      name: "Beatriz Pinto",
      entryPath: "./sites/beatriz-pinto/index.html",
      preview: "./previews/beatriz-pinto.jpg",
    },
    {
      name: "Beatriz Queirós",
      entryPath: "https://fakenewsfake.neocities.org",
      preview: "./previews/beatriz-queiros.jpg",
    },
    {
      name: "Bruna Borges",
      entryPath: "https://animaisextincao.neocities.org",
      preview: "./previews/bruna-borges.jpg",
    },
    {
      name: "Carolina Batista",
      entryPath: "./sites/carolina-baptista/Index.html",
      preview: "./previews/carolina-baptista.jpg",
    },
    {
      name: "Eduarda Pinho",
      entryPath: "https://yourfavouritenewsite.neocities.org",
      preview: "./previews/eduarda-pinho.jpg",
    },
    {
      name: "Inês Nero",
      entryPath: "https://rollingirl.neocities.org",
      preview: "./previews/ines-nero.jpg",
    },
    {
      name: "Luís Paulo",
      entryPath: "./sites/luis-paulo/index.html",
      preview: "./previews/luis-paulo.jpg",
    },
    {
      name: "Larissa Barros",
      entryPath: "https://larissaleone.my.canva.site/portf-lio-larissa-leone",
      preview: "./previews/larissa-barros.jpg",
    },
    {
      name: "Maria Morte",
      entryPath: "https://mariamortita.neocities.org/Net_Art_Proposta/ARTSPEAKS",
      preview: "./previews/maria-morte.jpg",
    },
    {
      name: "Maria Vieira",
      entryPath: "./sites/maria-vieira/index.html",
      preview: "./previews/maria-vieira.jpg",
    },
    {
      name: "Mariana Leiras",
      entryPath: "./sites/mariana-leiras/index.html",
      preview: "./previews/mariana-leiras.jpg",
    },
    {
      name: "Mariana Gonçalves",
      entryPath: "./sites/mariana-goncalves/index.html",
      preview: "./previews/mariana-goncalves.jpg",
    },
    {
      name: "Mariana Martins",
      entryPath: "./sites/mariana-martins/index.html",
      preview: "./previews/mariana-martins.jpg",
    },
    {
      name: "Marta Campos",
      entryPath: "./sites/marta-campos/index.html",
      preview: "./previews/marta-campos.jpg",
    },
    {
      name: "Matilde Francisco",
      entryPath: "./sites/matilde-francisco/index.html",
      preview: "./previews/matilde-francisco.jpg",
    },
    {
      name: "Nina Slonska",
      entryPath: "./sites/nina-slonska/index.html",
      preview: "./previews/nina-slonska.jpg",
    },
    {
      name: "Rute Oliveira",
      entryPath: "./sites/rute-oliveira/index.html",
      preview: "./previews/rute-oliveira.jpg",
    },
    {
      name: "Sara Maia",
      entryPath: "./sites/sara-maia/index.html",
      preview: "./previews/sara-maia.jpg",
    },
  ].map((project) => [project.name, project])
);

const studentNames = [
  "Ana Rodrigues",
  "Anna Carvalho",
  "Beatriz Henriques",
  "Beatriz Pinto",
  "Beatriz Queirós",
  "Bruna Borges",
  "Carolina Batista",
  "Eduarda Pinho",
  "Inês Nero",
  "Larissa Barros",
  "Luís Paulo",
  "Maria Morte",
  "Maria Vieira",
  "Mariana Gonçalves",
  "Mariana Leiras",
  "Mariana Martins",
  "Marta Campos",
  "Matilde Francisco",
  "Nina Slonska",
  "Rute Oliveira",
  "Sara Maia",
];

const projects = studentNames
  .sort((first, second) =>
    first.localeCompare(second, "pt", { sensitivity: "base" })
  )
  .map((name) => {
    const available = availableProjects.get(name);

    return {
      name,
      entryPath: available?.entryPath ?? "#",
      preview: available?.preview ?? "",
      hasSite: Boolean(available?.entryPath),
      hasPreview: Boolean(available?.preview),
    };
  });

const studentBoard = document.querySelector("[data-student-board]");
const studentCardTemplate = document.querySelector("#studentCardTemplate");
const posterStage = document.querySelector(".poster-stage");
const posterShell = document.querySelector(".poster-shell");
const touchLikeQuery = window.matchMedia("(hover: none), (pointer: coarse)");
const phoneLayoutQuery = window.matchMedia("(max-width: 760px)");

function formatStudentName(name) {
  const [firstName, ...rest] = name.trim().split(/\s+/);

  if (rest.length === 0) {
    return firstName;
  }

  return `${firstName}\n${rest.join(" ")}`;
}

function createStudentCard(project, index) {
  const cardFragment = studentCardTemplate.content.cloneNode(true);
  const tile = cardFragment.querySelector(".work-tile");
  const name = cardFragment.querySelector("[data-name]");
  const link = cardFragment.querySelector("[data-link]");
  const preview = cardFragment.querySelector("[data-preview]");

  tile.dataset.pattern = String(index % 8);
  name.textContent = formatStudentName(project.name);
  link.setAttribute("aria-label", `Abrir site de ${project.name}`);

  if (project.hasSite) {
    link.href = project.entryPath;
  } else {
    link.href = "#";
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => event.preventDefault());
  }

  if (project.hasPreview) {
    preview.src = project.preview;
    preview.alt = `Preview do site de ${project.name}`;
  } else {
    tile.classList.add("is-placeholder");
    preview.removeAttribute("src");
    preview.alt = "";
  }

  return cardFragment;
}

function renderStudentBoard() {
  studentBoard.textContent = "";

  if (projects.length === 0) {
    studentBoard.innerHTML =
      '<article class="empty-card">Ainda não existem estudantes nesta versão da mostra.</article>';
    return;
  }

  projects.forEach((project, index) =>
    studentBoard.append(createStudentCard(project, index))
  );
}

function closeFlippedCards(exception = null) {
  studentBoard
    ?.querySelectorAll(".work-tile.is-flipped")
    .forEach((tile) => {
      if (tile !== exception) {
        tile.classList.remove("is-flipped");
      }
    });
}

function setupTouchCardInteractions() {
  if (!studentBoard) {
    return;
  }

  const cards = studentBoard.querySelectorAll(".work-tile");

  cards.forEach((tile) => {
    tile.addEventListener("click", (event) => {
      if (!touchLikeQuery.matches) {
        return;
      }

      const link = event.target.closest("[data-link]");

      if (link) {
        return;
      }

      event.preventDefault();

      const shouldFlip = !tile.classList.contains("is-flipped");
      closeFlippedCards(tile);
      tile.classList.toggle("is-flipped", shouldFlip);
    });

    tile.addEventListener("keydown", (event) => {
      if (!touchLikeQuery.matches) {
        return;
      }

      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      if (event.target.closest("[data-link]")) {
        return;
      }

      event.preventDefault();
      const shouldFlip = !tile.classList.contains("is-flipped");
      closeFlippedCards(tile);
      tile.classList.toggle("is-flipped", shouldFlip);
    });
  });

  document.addEventListener("click", (event) => {
    if (!touchLikeQuery.matches) {
      return;
    }

    if (!event.target.closest(".work-tile")) {
      closeFlippedCards();
    }
  });
}

function updatePosterScale() {
  if (!posterStage || !posterShell) {
    return;
  }

  if (phoneLayoutQuery.matches) {
    document.documentElement.style.setProperty("--poster-scale", "1");
    posterStage.style.width = "100%";
    posterStage.style.height = `${posterShell.offsetHeight}px`;
    return;
  }

  const rootStyles = getComputedStyle(document.documentElement);
  const posterWidth =
    Number.parseFloat(rootStyles.getPropertyValue("--poster-width")) || 1180;
  const posterShiftX =
    Number.parseFloat(rootStyles.getPropertyValue("--poster-shift-x")) || 0;
  const viewportWidth = document.documentElement.clientWidth;
  const horizontalPadding = viewportWidth <= 760 ? 16 : 28;
  const safeWidth = Math.max(viewportWidth - horizontalPadding * 2, 320);
  const visualWidth = posterWidth + Math.abs(posterShiftX) * 2;
  const scale = Math.min(1, safeWidth / visualWidth);

  document.documentElement.style.setProperty("--poster-scale", `${scale}`);
  posterStage.style.width = `${Math.ceil(visualWidth * scale)}px`;
  posterStage.style.height = `${posterShell.offsetHeight * scale}px`;
}

renderStudentBoard();
setupTouchCardInteractions();
updatePosterScale();

window.addEventListener("resize", updatePosterScale);
window.addEventListener("orientationchange", updatePosterScale);
window.addEventListener("load", updatePosterScale);
phoneLayoutQuery.addEventListener?.("change", updatePosterScale);

if (document.fonts?.ready) {
  document.fonts.ready.then(updatePosterScale);
}
