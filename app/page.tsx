"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "./../app/app.css";

// Initialize AWS Amplify
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
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <img src="/path-to-your-photo.jpg" alt="Raveena Bolli" className="hero-photo" />
          <h1>Raveena Bolli</h1>
          <p>Data Science Student | Software Developer | 5+ Years of Experience</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-buttons">
          <a href="mailto:raveena.b98@gmail.com" className="contact-btn email-btn">
            <i className="fas fa-envelope"></i> Email Me
          </a>
          <a href="tel:+4407776742437" className="contact-btn phone-btn">
            <i className="fas fa-phone-alt"></i> Call Me
          </a>
          <a href="https://linkedin.com/in/raveenabolli" target="_blank" className="contact-btn linkedin-btn">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a href="https://github.com/raveenabolliDataInsights" target="_blank" className="contact-btn github-btn">
            <i className="fab fa-github"></i> GitHub
          </a>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section">
        <h2>About Me</h2>
        <p>I have 5+ years of experience in software development, data engineering, and data science. Below, you can find a timeline of my career journey.</p>
        <div className="timeline">
          <div className="timeline-item" id="cgi">
            <h3>CGI - Software Engineer (Aug 2018 - Nov 2021)</h3>
            <p>Worked on ETL pipelines and system optimizations for the IoT telecom project.</p>
            <button onClick={() => scrollToSkills("cgi")}>View Role Details</button>
          </div>
          <div className="timeline-item" id="optum">
            <h3>Optum Global Solutions - Software Developer II (Nov 2021 - Sep 2023)</h3>
            <p>Developed front-end features, optimized user experience, and ensured application scalability.</p>
            <button onClick={() => scrollToSkills("optum")}>View Role Details</button>
          </div>
          <div className="timeline-item" id="sysglobal">
            <h3>SysGlobal IT Solutions - Data Analyst Intern (Sept 2024 - May 2025)</h3>
            <p>Analyzed healthcare data, optimized ETL pipelines, and developed Power BI and Tableau reports.</p>
            <button onClick={() => scrollToSkills("sysglobal")}>View Role Details</button>
          </div>
        </div>
      </section>

      {/* Skills and Experience for each Role */}
      <section id="skills" className="skills-section">
        <h2>Skills & Experience</h2>
        {/* Role-Based Skills Display */}
        <div className="skills-container">
          <div className="skills-card" id="cgi-skills">
            <h3>CGI - Skills</h3>
            <ul>
              <li>Apache Kafka</li>
              <li>Spring Framework</li>
              <li>Jenkins</li>
            </ul>
          </div>
          <div className="skills-card" id="optum-skills">
            <h3>Optum Global Solutions - Skills</h3>
            <ul>
              <li>HTML/CSS/JS</li>
              <li>Spring & Hibernate</li>
              <li>Database Optimization</li>
            </ul>
          </div>
          <div className="skills-card" id="sysglobal-skills">
            <h3>SysGlobal IT Solutions - Skills</h3>
            <ul>
              <li>SQL</li>
              <li>Power BI & Tableau</li>
              <li>ETL Pipelines</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2>Projects</h2>
        <div className="projects-container">
          <div className="project-card">
            <h3>Portfolio Website</h3>
            <p>A modern portfolio website built using Next.js and AWS Amplify.</p>
            <a href="https://github.com/raveenabolliDataInsights/Portfolio-Website" target="_blank">View on GitHub</a>
          </div>
          <div className="project-card">
            <h3>ML Model Deployment</h3>
            <p>Deployed a machine learning model to AWS EC2 for real-time predictions.</p>
            <a href="https://github.com/your-username/project1" target="_blank">View on GitHub</a>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications-section">
        <h2>Certifications</h2>
        <p>AWS Cloud Practitioner</p>
        <p>Issued on November 29, 2024 - Expiry on November 29, 2027</p>
      </section>
    </main>
  );
}

// Scroll function to view role-based skills
function scrollToSkills(role) {
  const skillsSection = document.getElementById(`${role}-skills`);
  skillsSection.scrollIntoView({ behavior: "smooth" });
}
