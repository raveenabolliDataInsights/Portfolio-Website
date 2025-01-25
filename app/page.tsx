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
          <p>Data Science Student & Software Developer</p>
          <button onClick={() => window.location.href = "#projects"}>View My Work</button>
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2>Skills</h2>
        <div className="skills-container">
          {[
            { name: "Python", level: 90 },
            { name: "AWS", level: 85 },
            { name: "Machine Learning", level: 75 },
            { name: "Java", level: 80 },
          ].map((skill, index) => (
            <div key={index} className="skill-card">
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
              <a href={project.demoLink} target="_blank">Live Demo</a>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="section">
        <h2>Blog</h2>
        <ul>
          <li><a href="/blog/data-science-projects">My Journey in Data Science</a></li>
          <li><a href="/blog/working-with-aws">Working with AWS for Cloud Computing</a></li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>You can reach me via email at raveena@example.com</p>
        <button>Connect on LinkedIn</button>
      </section>

      {/* Todo Section */}
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
