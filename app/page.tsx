"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "./../app/app.css";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <main className="main-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Raveena Bolli</h1>
          <p>Data Science Student | Software Developer</p>
          <p>London, UK | raveena.b98@gmail.com | +44 07776742437</p>
          <div className="cta">
            <a href="#projects" className="cta-btn">See My Work</a>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2>Skills</h2>
        <div className="skills-container">
          {[
            { name: "Python", level: 90 },
            { name: "SQL", level: 85 },
            { name: "AWS", level: 80 },
            { name: "Machine Learning", level: 75 },
          ].map((skill, index) => (
            <div className="skill-card" key={index}>
              <h3>{skill.name}</h3>
              <div className="progress-bar" style={{ width: `${skill.level}%` }}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="projects-container">
          {[
            {
              title: "Portfolio Website",
              description: "A modern portfolio website built using Next.js and AWS Amplify.",
              githubLink: "https://github.com/raveenabolliDataInsights/Portfolio-Website",
              demoLink: "https://yourwebsite.com",
            },
            {
              title: "ML Model Deployment",
              description: "Deployed a machine learning model to AWS EC2 for real-time predictions.",
              githubLink: "https://github.com/your-username/project1",
              demoLink: "https://yourapp.com",
            },
          ].map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.githubLink} target="_blank">GitHub</a>
              {project.demoLink && <a href={project.demoLink} target="_blank">Live Demo</a>}
            </div>
          ))}
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work" className="section">
        <h2>Work Experience</h2>
        <div className="experience-container">
          {/* Your job roles and responsibilities */}
          <div className="experience-item">
            <h3>Data Analyst Intern</h3>
            <p>SysGlobal IT Solutions Ltd, UK | Sept 2024 - May 2025</p>
            <ul>
              <li>Managed and analyzed healthcare datasets using SQL and Python.</li>
              <li>Optimized ETL pipelines and improved reporting efficiency by 20%.</li>
            </ul>
          </div>
          {/* Other roles can be added here similarly */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>Email: <a href="mailto:raveena.b98@gmail.com">raveena.b98@gmail.com</a></p>
        <p>LinkedIn: <a href="https://linkedin.com/in/raveenabolli" target="_blank">linkedin.com/in/raveenabolli</a></p>
        <p>GitHub: <a href="https://github.com/raveenabolliDataInsights" target="_blank">github.com/raveenabolliDataInsights</a></p>
      </section>

      {/* Todo App Section */}
      <section id="todos" className="section">
        <h2>My Todos</h2>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
