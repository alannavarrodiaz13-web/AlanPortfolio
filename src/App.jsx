import { useState, useEffect } from "react";
import { projects } from "./data";
import "./App.css";

function App() {
const [page, setPage] = useState("home");
const [selectedProject, setSelectedProject] = useState(null);
const [selectedLocation, setSelectedLocation] = useState(null);
const [worksOpen, setWorksOpen] = useState(false);
const [worksFilter, setWorksFilter] = useState("FEATURED");

useEffect(() => {
if (selectedProject) {
window.scrollTo(0, 0);
}
}, [selectedProject]);

const featuredDescriptions = {
  "Giraffe & Birds":
    "One of my favourite photographs from the trip, capturing a giraffe in profile with three birds adding movement to the scene.",

  "Ostrich":
    "An ostrich standing alone in the open Serengeti, surrounded by a simple landscape that lets its shape stand out.",

  "Leopard":
    "The animal I most wanted to see in Tanzania, photographed sleeping peacefully among the branches of a tree.",

  "Cheetah":
    "A mother cheetah looking back towards us while her cubs were feeding, creating a brief moment of eye contact.",

  "Giraffe":
    "A close portrait of a giraffe with its long neck disappearing from the frame and soft light falling across its face.",

  "Elephants":
    "A family of elephants moving together through the Serengeti, capturing the quiet connection and scale of the group.",
};

const featuredTitles = [
"Giraffe & Birds",
"Ostrich",
"Leopard",
"Cheetah",
"Giraffe",
"Elephants",
];

const featuredProjects = featuredTitles
.map((title) =>
projects.find(
(project) =>
project.title.toLowerCase() === title.toLowerCase()
)
)
.filter(Boolean);

const locations = [...new Set(projects.map((project) => project.location))];

const workCategories = [
"FEATURED",
"SERENGETI",
"MOUNTAIN",
"ALL",
];

const filteredProjects =
worksFilter === "ALL"
? projects
: worksFilter === "FEATURED"
? featuredProjects
: projects.filter(
(project) =>
project.location.toUpperCase() === worksFilter
);

const openHome = () => {
setPage("home");
setSelectedProject(null);
setSelectedLocation(null);
setWorksOpen(false);
setWorksFilter("FEATURED");
window.scrollTo(0, 0);
};

const selectWorksCategory = (category) => {
setWorksFilter(category);
setWorksOpen(false);
setSelectedProject(null);
setSelectedLocation(null);
setPage("home");
window.scrollTo(0, 0);
};

return ( <div className="site">


  {/* NAVIGATION */}

  <header className="navbar">

    <button
      className="logo"
      onClick={openHome}
    >
      ALAN NAVARRO
    </button>

    <nav>

      <button
        className={worksOpen ? "nav-active" : ""}
        onClick={() => {
          setWorksOpen(!worksOpen);
          setSelectedProject(null);
          setSelectedLocation(null);
          setPage("home");
        }}
      >
        WORKS
      </button>

      <button
        onClick={() => {
          setWorksOpen(false);
          setPage("about");
          setSelectedProject(null);
          setSelectedLocation(null);
          window.scrollTo(0, 0);
        }}
      >
        ABOUT
      </button>

      <button
        onClick={() => {
          setWorksOpen(false);
          setPage("contact");
          setSelectedProject(null);
          setSelectedLocation(null);
          window.scrollTo(0, 0);
        }}
      >
        CONTACT
      </button>

    </nav>

  </header>


  {/* WORKS DROPDOWN */}

  {worksOpen && page === "home" && (

    <div className="works-dropdown">

      {workCategories.map((category) => (

        <button
          key={category}
          className={
            worksFilter === category
              ? "works-category active"
              : "works-category"
          }
          onClick={() => selectWorksCategory(category)}
        >
          {category}
        </button>

      ))}

    </div>

  )}


  {/* HOME */}

  {page === "home" &&
    !selectedProject &&
    !selectedLocation && (

      <main>

        <section className="intro">

          <p className="eyebrow">
            PHOTOGRAPHER / VISUAL CREATOR
          </p>

          <h1>
            Moments,
            <br />
            <span className="captured">
              captured.
            </span>
          </h1>

          <p className="intro-text">
            Photography portfolio by Alan Navarro, based in Barcelona.
          </p>

        </section>


        {/* FEATURED / WORKS */}

        <section className="featured-section">

          <div className="section-heading">
            {worksFilter === "ALL"
              ? "ALL"
              : worksFilter}
          </div>

          <div className="featured-grid">

            {filteredProjects.map((project) => (

              <article
                className="photo-card"
                key={project.id}
                onClick={() => setSelectedProject(project)}
              >

                <div className="image-wrapper">

                  <img
                    src={project.image}
                    alt={project.title}
                  />

                  <div className="image-overlay">
                    <span>
                      VIEW PROJECT
                    </span>
                  </div>

                </div>


                <div className="featured-info">

                  <div className="featured-title-row">

                    <h2>
                      {project.title}
                    </h2>

                    <span className="featured-location">
                      {project.location}
                    </span>

                  </div>

                  {worksFilter === "FEATURED" && (
                    <p>
                      {featuredDescriptions[project.title]}
                    </p>
                  )}

                </div>

              </article>

            ))}

          </div>

          {filteredProjects.length === 0 && (

            <p className="empty-category">
              No projects in this category yet.
            </p>

          )}

        </section>

      </main>
    )}


  {/* LOCATION PAGE */}

  {page === "location" &&
    selectedLocation &&
    !selectedProject && (

      <main className="location-page">

        <button
          className="back"
          onClick={() => {
            setSelectedLocation(null);
            setPage("home");
            window.scrollTo(0, 0);
          }}
        >
          → BACK TO WORKS
        </button>


        <section className="location-intro">

          <p className="eyebrow">
            PROJECT
          </p>

          <h1>
            {selectedLocation}
            <br />
            <span className="contrast-title">
              SERIES.
            </span>
          </h1>

          <p className="location-story">
            A photographic series documenting places, wildlife
            and moments from the journey.
          </p>

        </section>


        <section className="location-gallery">

          {projects
            .filter(
              (project) =>
                project.location === selectedLocation
            )
            .map((project) => (

              <article
                className="location-photo"
                key={project.id}
                onClick={() =>
                  setSelectedProject(project)
                }
              >

                <div className="image-wrapper">

                  <img
                    src={project.image}
                    alt={project.title}
                  />

                  <div className="image-overlay">

                    <span>
                      VIEW PROJECT
                    </span>

                  </div>

                </div>

                <div className="photo-info">

                  <h2>
                    {project.title}
                  </h2>

                  <p>
                    {project.location}
                  </p>

                </div>

              </article>

            ))}

        </section>

      </main>
    )}


  {/* INDIVIDUAL PHOTO */}

  {selectedProject && (

    <main className="project-page">

      <button
        className="back"
        onClick={() => setSelectedProject(null)}
      >
        → BACK TO PROJECT
      </button>

      <div className="project-image">

        <img
          src={selectedProject.image}
          alt={selectedProject.title}
        />

      </div>


      <div className="project-details">

        <div>

          <p className="eyebrow">
            {selectedProject.location}
          </p>

          <h1>
            {selectedProject.title}
          </h1>

          <p className="story">
            {selectedProject.story}
          </p>

        </div>


        <div className="technical">

          <div>
            <span>DATE</span>
            <p>{selectedProject.date}</p>
          </div>

          <div>
            <span>CAMERA</span>
            <p>{selectedProject.camera}</p>
          </div>

          <div>
            <span>LENS</span>
            <p>{selectedProject.lens}</p>
          </div>

          <div>
            <span>SETTINGS</span>

            <p>
              Aperture&nbsp;&nbsp; {selectedProject.settings?.aperture}
              <br />
              Shutter&nbsp;&nbsp; {selectedProject.settings?.shutter}
              <br />
              ISO&nbsp;&nbsp; {selectedProject.settings?.iso}
            </p>
          </div>

        </div>

      </div>

    </main>
  )}


  {/* ABOUT */}

  {page === "about" &&
    !selectedProject &&
    !selectedLocation && (

      <main className="simple-page">

        <p className="eyebrow">
          ABOUT
        </p>

        <h1>
          About
          <br />
          <span className="contrast-title">
            ME.
          </span>
        </h1>

        <div className="about-content">

          <div className="about-image">

            <img
              src="public/alan.JPG"
              alt="Alan"
            />

          </div>

          <div className="about-text">

            <p>
              I'm Alan, a photographer and visual creator based
              in Barcelona.
            </p>

            <p>
              I enjoy documenting places, people and moments
              through photography, while also exploring editing
              and visual work.
            </p>

            <div className="equipment">

              <div className="equipment-item">
                <img
                  src="/photos/equipment/a6400.jpg"
                  alt="Sony α6400"
                />
                <p>Sony α6400</p>
              </div>

              <div className="equipment-item">
                <img
                  src="/photos/equipment/lens.jpg"
                  alt="Sony 55–210mm"
                />
                <p>55–210mm</p>
              </div>

            </div>


            <div className="socials">

              <a
                href="https://instagram.com/aalannavaarro"
                target="_blank"
                rel="noreferrer"
              >
                Instagram →
              </a>

              <a href="mailto:alannavarrodiaz13@gmail.com">
                Email →
              </a>

            </div>

          </div>

        </div>

      </main>

    )}


  {/* CONTACT */}

  {page === "contact" &&
    !selectedProject &&
    !selectedLocation && (

      <main className="simple-page contact-page">

        <p className="eyebrow">
          CONTACT
        </p>

        <h1>
          Let's work
          <br />
          <span className="contrast-title">
            TOGETHER.
          </span>
        </h1>

        <a
          className="email"
          href="mailto:alannavarrodiaz13@gmail.com"
        >
          alannavarrodiaz13@gmail.com →
        </a>

        <a
          href="https://instagram.com/aalannavaarro"
          target="_blank"
          rel="noreferrer"
          className="instagram"
        >
          Instagram →
        </a>

      </main>

    )}


  <footer>

    <span>
      © 2026 ALAN NAVARRO
    </span>

    <span>
      BARCELONA
    </span>

  </footer>

</div>
);
}

export default App;
