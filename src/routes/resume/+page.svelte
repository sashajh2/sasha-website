<style>
    @import url("$lib/global.css");
    h1 {
       color: var(--text);
    }
    h2 {
       color: var(--primary);
    }
    h3 {
       color: var(--text);
    }
    p {
        color: var(--text)
    }
    .location {
        color: var(--secondary)
    }
    
    .section {
        margin-bottom: 24px;
    }
    .article {
        margin: 8px;
    }
    ul {
        list-style-type: circle; /* Use disc for bullet points */
        padding-left: 20px; /* Add padding for indentation */
    }
</style>

<svelte:head>
	<title>Resume</title>
</svelte:head>
<h1>Sasha Jovanovic-Hacon</h1>
<div class="section">
        <h2>Education</h2>
        <div class="article">
        <h3>Massachusetts Institute of Technology</h3>
        <h4 class="location">Bachelor of Science, Mathematics and Computer Science; 4.7/5.0 GPA</h4>
        <ul>
            <li>Expected Graduation: <time datetime="2024-12-01">December 2024</time></li>
            <li>Relevant Coursework: Algorithms, Machine Learning, Statistics and Probability, Fund. of Programming, Real Analysis</li>
            <li>Societies and Activities: Varsity Lightweight Rowing, Phi Sigma Kappa (President)</li>
        </ul>
    </div>
</div>
<div class="section">
    <h2>Work Experience</h2>
    <div class="article">
        <h3>MIT Media Lab, Undergraduate Researcher</h3>
        <h4 class="location">Cambridge, MA <time datetime="2023-08-01">Aug 2023</time> - present</h4>
        <ul>
            <li>Spearheading the creation of a transformer-based embedding conversion method aimed at harmonizing word embeddings from diverse Large Language Models (LLMs), improving modularity and efficiency</li>
            <li>Building a web application exploring the latent spaces of large datasets, including academic papers, patents, and research, with the aim of generating new works</li>
        </ul>
    </div>
    <div class="article">
        <h3>Velvet Financial Services, Junior Software Engineer</h3>
        <h4 class="location">Salt Lake City, UT <time datetime="2022-05-01">May 2022</time> - <time datetime="2023-08-01">Aug 2023</time></h4>
        <ul>
            <li>Developed and deployed over 50 mobile-responsive web pages as part of the final website, contributing to a seamless and user-friendly online experience across various devices.</li>
            <li>Utilized a full stack skill set for front-end (HTML, CSS, JavaScript) and back-end (Node.js, Python) development.</li>
            <li>Aided the creation of an AI tool streamlining investment onboarding, automating document parsing, data extraction, and listing generation.</li>
        </ul>
    </div>
</div>
<div class="section">
    <h2>Skills</h2>
    <ul>
        <li>Programming: Python, React, HTML, Go, R, Java, Javascript</li>
        <li>World Languages: Fluency in English, Spanish, and Serbian</li>
        <li>Software: Linear, Figma (design), Material UI, PyTorch, Gusto, LaTex</li>
    </ul>
</div>