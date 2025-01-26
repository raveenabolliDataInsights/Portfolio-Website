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

// Components Import
import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import CertificationsSection from "./components/CertificationsSection";
import SocialIconsSection from "./components/SocialIconsSection";

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

  return (
    <main className="main-container">
      {/* Sidebar Section */}
      <Sidebar />

      {/* Hero Section */}
      <HeroSection />

      {/* Experience  Section */}
      <ExperienceSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Social Media Icons Section */}
      <SocialIconsSection />
    </main>
  );
}

// Example of refactored component (SkillsSection)
export function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      <h2>Skills</h2>
      <div className="skills-container">
        <div className="skill-card">
          <h3>Python</h3>
          <img src="/Images/SQL.png" alt="Python" />
          <div className="progress-bar" style={{ width: "90%" }}></div>
        </div>
        <div className="skill-card">
          <h3>AWS</h3>
          <img src="/Images/Kafka.png" alt="AWS" />
          <div className="progress-bar" style={{ width: "80%" }}></div>
        </div>
        <div className="skill-card">
          <h3>Data Science</h3>
          <img src="/Images/Java.png" alt="Machine Learning" />
          <div className="progress-bar" style={{ width: "75%" }}></div>
        </div>
      </div>
    </section>
  );
}

// Refactor similar components for Sidebar, HeroSection, etc. as needed.
