document.addEventListener("DOMContentLoaded", () => {
  animateProgressBars();
  setupWorkoutCheckins();
  setupPhotoHover();
  setupStickyLifeGallery();
  setupReadingTracker();
});

function animateProgressBars() {
  const cards = document.querySelectorAll(".goal-card");

  const reveal = (card) => {
    const progress = card.dataset.progress || "0";
    const fill = card.querySelector(".progress-bar span");
    if (fill) {
      fill.style.width = `${progress}%`;
    }
  };

  if (!("IntersectionObserver" in window)) {
    cards.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  cards.forEach((card) => observer.observe(card));
}

function setupWorkoutCheckins() {
  const buttons = document.querySelectorAll(".check-day");
  const count = document.querySelector("#checkinCount");

  const updateCount = () => {
    const finished = document.querySelectorAll(".check-day.done").length;
    count.textContent = `${finished} / 7 已完成`;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const done = button.classList.toggle("done");
      button.setAttribute("aria-pressed", String(done));
      button.querySelector("strong").textContent = done ? "已完成" : "未完成";
      updateCount();
    });
  });

  updateCount();
}

function setupPhotoHover() {
  document.querySelectorAll(".wall-item").forEach((item) => {
    item.addEventListener("pointerenter", () => item.classList.add("is-hovered"));
    item.addEventListener("pointerleave", () => item.classList.remove("is-hovered"));
  });
}

function setupReadingTracker() {
  const shelf = document.querySelector("#bookShelf");
  const stage = document.querySelector("#bookStage");
  const cover = document.querySelector("#spotlightCover");
  const fallbackTitle = document.querySelector("#fallbackTitle");
  const fallbackAuthor = document.querySelector("#fallbackAuthor");
  const fallbackCategory = document.querySelector("#fallbackCategory");
  const category = document.querySelector("#spotlightCategory");
  const status = document.querySelector("#spotlightStatus");
  const title = document.querySelector("#spotlightTitle");
  const author = document.querySelector("#spotlightAuthor");
  const description = document.querySelector("#spotlightDescription");
  const progressInput = document.querySelector("#spotlightProgress");
  const progressText = document.querySelector("#spotlightProgressText");
  const progressFill = document.querySelector("#spotlightProgressFill");
  const reflection = document.querySelector("#personalReflection");
  const finishDate = document.querySelector("#finishDate");
  const finishButton = document.querySelector("#finishBookButton");
  const finishedBooks = document.querySelector("#finishedBooks");
  const finishedCount = document.querySelector("#finishedCount");
  const addButton = document.querySelector("#addBookButton");
  const newBookTitle = document.querySelector("#newBookTitle");
  const newBookAuthor = document.querySelector("#newBookAuthor");
  const newBookCategory = document.querySelector("#newBookCategory");
  const newBookCover = document.querySelector("#newBookCover");
  const newBookDescription = document.querySelector("#newBookDescription");
  const storageKey = "ann-reading-visualiser-2026";

  if (!shelf || !stage || !cover || !progressInput || !reflection) {
    return;
  }

  const baseBooks = [
    {
      id: "cotton-empire",
      title: "棉花帝国",
      author: "[美] 斯文·贝克特",
      category: "历史观察",
      period: "2026.07.03 - 2026.07.24",
      color: "#b76f63",
      cover: "https://covers.openlibrary.org/b/title/Empire%20of%20Cotton-L.jpg",
      description: "从棉花贸易、奴隶制、工业资本与帝国扩张切入，理解现代资本主义全球体系如何形成。"
    },
    {
      id: "collapse-celestial",
      title: "天朝的崩溃",
      author: "茅海建",
      category: "历史观察",
      period: "2026.07.25 - 2026.08.14",
      color: "#9b5f50",
      cover: "https://covers.openlibrary.org/b/isbn/9787108007575-L.jpg",
      description: "以鸦片战争再研究为核心，重新观察清王朝面对近代世界冲击时的制度反应和历史转折。"
    },
    {
      id: "falling-prosperity",
      title: "盛世的崩塌",
      author: "作者信息待确认",
      category: "历史观察",
      period: "2026.08.15 - 2026.09.04",
      color: "#c49a65",
      cover: "",
      description: "把它放在历史线中阅读：重点记录繁荣表象下的结构裂缝，以及一个时代如何从稳定走向失衡。"
    },
    {
      id: "her-eyes",
      title: "带上她的眼睛",
      author: "刘慈欣",
      category: "小说类",
      period: "2026.09.05 - 2026.09.13",
      color: "#789bb8",
      cover: "https://covers.openlibrary.org/b/isbn/9787536481077-L.jpg",
      description: "短篇科幻小说，用一双远方的眼睛重新观看日常世界，也提醒人保持感受力和想象力。"
    },
    {
      id: "fried-green-tomatoes",
      title: "油炸绿番茄",
      author: "[美] 范妮·弗拉格",
      category: "小说类",
      period: "2026.09.14 - 2026.09.30",
      color: "#7fa46f",
      cover: "https://covers.openlibrary.org/b/isbn/9787569949834-L.jpg",
      description: "围绕小镇、友情、女性生命力和记忆展开，适合放在秋天慢慢读。"
    },
    {
      id: "holy-mother",
      title: "圣母",
      author: "[日] 秋吉理香子",
      category: "小说类",
      period: "2026.10.01 - 2026.10.17",
      color: "#a85f75",
      cover: "",
      description: "悬疑小说，适合记录叙事反转、人物动机和母性主题里让自己停顿的地方。"
    },
    {
      id: "qinyou",
      title: "钦游",
      author: "作者信息待补充",
      category: "小说类",
      period: "2026.10.18 - 2026.11.01",
      color: "#8e8bb5",
      cover: "",
      description: "公开资料暂未稳定匹配到这本书。这里先保留阅读位，后续可以补作者、封面和简介。"
    },
    {
      id: "your-summer",
      title: "你的夏天还好吗？",
      author: "[韩] 金爱烂",
      category: "小说类",
      period: "2026.11.02 - 2026.11.16",
      color: "#d9a35f",
      cover: "https://covers.openlibrary.org/b/title/%E4%BD%A0%E7%9A%84%E5%A4%8F%E5%A4%A9%E8%BF%98%E5%A5%BD%E5%90%97-L.jpg",
      description: "短篇小说集，适合关注年轻人的日常处境、关系细节和那些说不出口的情绪。"
    },
    {
      id: "crowd",
      title: "乌合之众",
      author: "[法] 古斯塔夫·勒庞",
      category: "个人思考类",
      period: "2026.11.17 - 2026.12.08",
      color: "#6f7480",
      cover: "https://covers.openlibrary.org/b/isbn/9787218143101-L.jpg",
      description: "经典群体心理学读物，阅读时可以把重点放在群体情绪、意见传播和个人判断的边界。"
    },
    {
      id: "sapiens",
      title: "人类简史",
      author: "[以] 尤瓦尔·赫拉利",
      category: "个人思考类",
      period: "2026.12.09 - 2026.12.31",
      color: "#8a9d88",
      cover: "https://covers.openlibrary.org/b/isbn/9787508660752-L.jpg",
      description: "从认知革命、农业革命到科学革命，梳理人类社会如何通过想象、协作与制度一路演化。"
    }
  ];

  const defaultState = {
    activeId: "cotton-empire",
    progress: { "cotton-empire": 18 },
    reflections: {},
    finished: [],
    customBooks: []
  };

  let state = readState();
  let books = [...baseBooks, ...state.customBooks];

  function readState() {
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    state.customBooks = books.filter((book) => book.custom);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // The interaction still works during this visit if local storage is unavailable.
    }
  }

  function getActiveBook() {
    return books.find((book) => book.id === state.activeId) || books[0];
  }

  function isFinished(bookId) {
    return state.finished.some((record) => record.id === bookId);
  }

  function getProgress(bookId) {
    return isFinished(bookId) ? 100 : Number(state.progress[bookId] || 0);
  }

  function createCoverImage(src, alt) {
    const img = document.createElement("img");
    img.alt = alt;
    if (src) {
      img.src = src;
    } else {
      img.classList.add("is-hidden");
    }
    img.addEventListener("error", () => img.classList.add("is-hidden"));
    img.addEventListener("load", () => img.classList.remove("is-hidden"));
    return img;
  }

  function renderShelf() {
    shelf.replaceChildren();

    books.forEach((book) => {
      const button = document.createElement("button");
      const tileCover = document.createElement("span");
      const fallback = document.createElement("span");
      const meta = document.createElement("span");
      const name = document.createElement("strong");
      const byline = document.createElement("span");
      const small = document.createElement("small");

      button.type = "button";
      button.className = "book-tile";
      button.classList.toggle("is-active", book.id === state.activeId);
      button.style.setProperty("--tile-color", book.color);
      tileCover.className = "tile-cover";
      meta.className = "tile-meta";
      fallback.textContent = book.title;
      name.textContent = `《${book.title}》`;
      byline.textContent = book.author;
      small.textContent = `${book.category} · ${getProgress(book.id)}%`;

      tileCover.append(createCoverImage(book.cover, `${book.title}封面`), fallback);
      meta.append(name, byline, small);
      button.append(tileCover, meta);

      button.addEventListener("click", () => {
        state.reflections[state.activeId] = reflection.value;
        state.activeId = book.id;
        saveState();
        render();
      });

      shelf.append(button);
    });
  }

  function renderFinished() {
    finishedCount.textContent = `${state.finished.length}本`;

    if (state.finished.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-note";
      empty.textContent = "还没有完成记录。看完一本书后，可以在这里留下完成日期和当时的想法。";
      finishedBooks.replaceChildren(empty);
      return;
    }

    finishedBooks.replaceChildren(
      ...state.finished.map((record) => {
        const item = document.createElement("div");
        const heading = document.createElement("strong");
        const text = document.createElement("span");
        item.className = "finished-record";
        heading.textContent = `《${record.title}》 · ${record.date}`;
        text.textContent = record.reflection || "已完成阅读，等待补充更完整的读后感。";
        item.append(heading, text);
        return item;
      })
    );
  }

  function renderGoalProgress() {
    const readingGoal = document.querySelector("#goals .goal-card");
    if (!readingGoal) {
      return;
    }

    const completed = state.finished.length;
    const total = books.length;
    const percent = Math.round((completed / total) * 100);
    const meta = readingGoal.querySelector(".progress-meta strong");
    const bar = readingGoal.querySelector(".progress-bar span");

    readingGoal.dataset.progress = String(percent);
    if (meta) {
      meta.textContent = `${completed} / ${total} 本，${getActiveBook().title}进行中`;
    }
    if (bar) {
      bar.style.width = `${percent}%`;
    }
  }

  function render() {
    const book = getActiveBook();
    const progress = getProgress(book.id);
    const finished = isFinished(book.id);

    stage.style.setProperty("--book-accent", book.color);
    cover.classList.toggle("is-hidden", !book.cover);
    if (book.cover) {
      cover.src = book.cover;
    } else {
      cover.removeAttribute("src");
    }
    cover.alt = `${book.title}封面`;
    fallbackTitle.textContent = book.title;
    fallbackAuthor.textContent = book.author;
    fallbackCategory.textContent = book.category;
    category.textContent = book.category;
    status.textContent = finished ? "已看完" : book.id === state.activeId ? "正在看" : "计划中";
    title.textContent = `《${book.title}》`;
    author.textContent = `作者：${book.author}`;
    description.textContent = `${book.description} · 计划 ${book.period}`;
    progressInput.value = progress;
    progressInput.disabled = finished;
    progressText.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;
    reflection.value = state.reflections[book.id] || "";
    reflection.disabled = false;
    finishButton.disabled = finished;
    finishButton.textContent = finished ? "已收进完成记录" : "标记为已看完";

    renderShelf();
    renderFinished();
    renderGoalProgress();
  }

  progressInput.addEventListener("input", () => {
    state.progress[state.activeId] = Number(progressInput.value);
    saveState();
    render();
  });

  reflection.addEventListener("input", () => {
    state.reflections[state.activeId] = reflection.value;
    saveState();
  });

  finishButton.addEventListener("click", () => {
    const book = getActiveBook();

    if (!isFinished(book.id)) {
      state.finished.push({
        id: book.id,
        title: book.title,
        date: finishDate.value || "2026-07-03",
        reflection: reflection.value.trim()
      });
      state.progress[book.id] = 100;
    }

    const nextBook = books.find((candidate) => !isFinished(candidate.id));
    if (nextBook) {
      state.activeId = nextBook.id;
    }

    saveState();
    render();
  });

  addButton.addEventListener("click", () => {
    const customTitle = newBookTitle.value.trim();

    if (!customTitle) {
      newBookTitle.focus();
      return;
    }

    const customBook = {
      id: `custom-${Date.now()}`,
      title: customTitle,
      author: newBookAuthor.value.trim() || "作者待补充",
      category: newBookCategory.value.trim() || "自定义书籍",
      period: "自定义计划",
      color: "#9fb6c9",
      cover: newBookCover.value.trim(),
      description: newBookDescription.value.trim() || "这本书是后来加入阅读计划的，读的时候可以补充内容介绍和阅读理由。",
      custom: true
    };

    books.push(customBook);
    state.activeId = customBook.id;
    state.progress[customBook.id] = 0;
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookCategory.value = "";
    newBookCover.value = "";
    newBookDescription.value = "";
    saveState();
    render();
  });

  render();
}

function setupStickyLifeGallery() {
  const section = document.querySelector(".life-gallery");
  const sticky = document.querySelector(".life-sticky");
  const items = Array.from(document.querySelectorAll(".scroll-memory"));
  const mobileQuery = window.matchMedia("(max-width: 840px)");

  if (!section || !sticky || items.length === 0) {
    return;
  }

  let ticking = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const easeOut = (value) => 1 - Math.pow(1 - value, 3);
  const easeInOut = (value) =>
    value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

  const resetDesktopStyles = () => {
    items.forEach((item) => {
      item.style.transform = "";
      item.style.opacity = "";
      item.style.filter = "";
    });
  };

  const update = () => {
    ticking = false;

    if (mobileQuery.matches) {
      resetDesktopStyles();
      return;
    }

    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    const rawProgress = clamp(-rect.top / scrollable, 0, 1);
    const progress = easeInOut(rawProgress);
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    sticky.style.setProperty("--gallery-progress", progress.toFixed(3));
    sticky.style.setProperty("--gallery-line-opacity", (0.28 + progress * 0.5).toFixed(3));
    sticky.style.setProperty("--gallery-cue-opacity", (1 - progress * 0.72).toFixed(3));

    items.forEach((item, index) => {
      const targetX = Number(item.dataset.x || 0) * viewportW * 0.01;
      const targetY = Number(item.dataset.y || 0) * viewportH * 0.01;
      const targetRotate = Number(item.dataset.rotate || 0);
      const targetScale = Number(item.dataset.scale || 1);
      const depth = Number(item.dataset.depth || 1);
      const staggerStart = index * 0.035;
      const local = clamp((rawProgress - staggerStart) / 0.78, 0, 1);
      const easedLocal = easeOut(local);
      const parallax = Math.sin((rawProgress + index * 0.08) * Math.PI) * 22 * depth;
      const settle = Math.sin(rawProgress * Math.PI) * 12;
      const x = targetX * easedLocal;
      const y = targetY * easedLocal - parallax + settle;
      const rotate = targetRotate * easedLocal;
      const scale = 0.52 + (targetScale - 0.52) * easedLocal + rawProgress * 0.08;
      const opacity = clamp(0.18 + easedLocal * 0.82, 0.18, 1);
      const blur = (1 - easedLocal) * 3.2;

      item.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotate(${rotate}deg) scale(${scale})`;
      item.style.opacity = opacity.toFixed(3);
      item.style.filter = `blur(${blur.toFixed(2)}px) saturate(${0.88 + easedLocal * 0.22})`;
    });
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  const revealMobileItems = () => {
    if (!mobileQuery.matches || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  mobileQuery.addEventListener("change", () => {
    revealMobileItems();
    requestUpdate();
  });

  revealMobileItems();
  update();
}
