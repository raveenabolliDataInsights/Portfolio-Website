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

  // Scroll function to view role-based skills
  function scrollToSkills(role: string): void {
    const skillsSection = document.getElementById(`${role}-skills`);
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <main className="main-container">
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <img src="/Images/logo.jpg" alt="Raveena Bolli" className="hero-photo" />
          <h1>Raveena Bolli</h1>
          <div className="cta-btns">
            <a href="#experience" className="cta-btn left-btn">See My Experience</a>
            <div className="contact-btns">
              <a href="mailto:raveena.b98@gmail.com" className="contact-btn email-btn">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="tel:+4407776742437" className="contact-btn phone-btn">
                <i className="fas fa-phone-alt"></i>
              </a>
              <a href="https://linkedin.com/in/raveenabolli" target="_blank" className="contact-btn linkedin-btn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/raveenabolliDataInsights" target="_blank" className="contact-btn github-btn">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Journey Section */}
      <section id="experience" className="experience-section">
        <h2>Experience Journey</h2>
        <div className="timeline">
          <div className="timeline-item" id="cgi">
            <h3>CGI - Software Engineer (Aug 2018 - Nov 2021)</h3>
            <p>Worked on ETL pipelines, system optimizations for IoT telecom project.</p>
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

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <h2>Skills</h2>
        <div className="skills-container">
          <div className="skill-card">
            <h3>Python</h3>
            <div className="progress-bar" style={{ width: "90%" }}></div>
          </div>
          <div className="skill-card">
            <h3>AWS</h3>
            <div className="progress-bar" style={{ width: "80%" }}></div>
          </div>
          <div className="skill-card">
            <h3>Machine Learning</h3>
            <div className="progress-bar" style={{ width: "75%" }}></div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications-section">
        <h2>Certifications</h2>
        <p>AWS Cloud Practitioner</p>
        <img src="/Images/AWS Badge.png" alt="AWS Certification Badge" className="aws-badge" />
        <p>Issued on November 29, 2024 - Expiry on November 29, 2027</p>
      </section>
    </main>
  );
}
