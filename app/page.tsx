"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "./../app/app.css";

// Amplify configuration
Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function App() {
  // State for the Todo App
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // Fetch todos from the backend
  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  // Function to create new todos
  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <main>
      {/* Portfolio Introduction */}
      <header>
        <h1>Welcome to My Portfolio!</h1>
        <p>
          I’m Raveena Bolli, a Data Science Student at the University of Hertfordshire with a strong background in Software Development and Data Engineering. I have 5 years of IT experience and specialize in Data Science, Machine Learning, and Cloud Technologies.
        </p>
      </header>

      {/* Navigation Links */}
      <nav>
        <ul>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#blog">Blog</a></li>
        </ul>
      </nav>

      {/* Skills Section */}
      <section id="skills">
        <h2>Skills</h2>
        <div className="skills-cards">
          {[
            { name: "Python", level: "Advanced" },
            { name: "AWS (EC2, S3, IAM)", level: "Advanced" },
            { name: "Machine Learning", level: "Intermediate" },
            { name: "Java", level: "Advanced" },
            { name: "Spring, Hibernate", level: "Intermediate" },
            { name: "Data Visualization (Matplotlib, Seaborn)", level: "Intermediate" },
            { name: "Jenkins, Git", level: "Intermediate" },
          ].map((skill, index) => (
            <div className="card" key={index}>
              <h3>{skill.name}</h3>
              <p>{skill.level}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h2>Projects</h2>
        <div className="project-gallery">
          {[
            {
              title: "Personal Portfolio Website",
              description: "A personal portfolio website built using Next.js and AWS Amplify.",
              githubLink: "https://github.com/raveenabolliDataInsights/Portfolio-Website",
              demoLink: "https://yourwebsite.com",  // Replace with your live demo link
            },
            {
              title: "Machine Learning Model Deployment",
              description: "Deployed a machine learning model to AWS EC2 for real-time predictions.",
              githubLink: "https://github.com/your-username/project1",
              demoLink: "https://yourapp.com", // Replace with your live demo link
            },
          ].map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.githubLink} target="_blank">GitHub</a>
              {project.demoLink && <a href={project.demoLink} target="_blank">Live Demo</a>}
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog">
        <h2>Blog</h2>
        <ul>
          <li><a href="/blog/data-science-projects">My Journey in Data Science</a></li>
          <li><a href="/blog/working-with-aws">Working with AWS for Cloud Computing</a></li>
        </ul>
      </section>

      {/* Todo App Section */}
      <section id="todos">
        <h2>My Todos</h2>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
      </section>

      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}
