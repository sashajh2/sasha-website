<style>
    @import url("$lib/global.css");
    h1 {
       color: var(--primary);
    }
    h2 {
       color: var(--primary);
    }
    h3 {
       color: var(--text);
       margin: 10px 0;
    }
    h4 {
        margin: 10px 0;
    }
    p {
        color: var(--text)
    }
    ul {
        margin: 10px;
    }
    .location {
        color: var(--secondary)
    }
    
    .section {
        margin-bottom: 24px;
    }
    .article {
        flex-direction: column;
        margin-left: 10px;
        margin-bottom: 30px;
        gap: 0px;
    }
    ul {
        list-style-type: disc; 
        padding-left: 20px;
    }
    ul li {
        display: block;
    }
    .download-button {
        display: inline-flex;
        align-items: center;
        padding: 10px 15px;
        background-color: var(--primary);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        margin: 20px 0;
        transition: background-color 0.3s;
    }

    .download-button:hover {
        background-color: var(--secondary);
    }

    .download-icon {
        width: 20px; /* Adjust icon size */
        height: auto;
        margin-right: 8px; /* Spacing between icon and text */
        fill: white; /* Change fill color to match text */
    }
</style>

<svelte:head>
	<title>Resume</title>
</svelte:head>
<a href="files/resume/Resume-2024 Updated-4.docx" download class="download-button">
    <svg class="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v12m0 0l-3-3m3 3 3-3"/>
    </svg>
    Download Resume
</a>

<h1>Sasha Jovanovic-Hacon</h1>
<div class="section">
    <h2>Education</h2>
    <div class="article">
        <h3>Massachusetts Institute of Technology</h3>
        <h4 class="location">Bachelor of Science, Mathematics and Computer Science; 4.7/5.0 GPA</h4>
        <ul>
            <li>&bull; Expected Graduation: <time datetime="2024-12-01">December 2024</time></li>
            <li>&bull; Relevant Coursework: Discrete Math, Algorithms 1, Algorithms 2, Machine Learning, Statistics and Probability, Fund. of Programming, Real Analysis, Data Visualization, Computer Vision</li>
            <li>&bull; Societies and Activities: Varsity Lightweight Rowing, Phi Sigma Kappa (President)</li>
        </ul>
    </div>
</div>
<div class="section">
    <h2>Work Experience</h2>
    <div class="article">
        <h3>Uncountable Inc, Software Engineering Intern</h3>
        <h4 class="location">San Francisco, CA <time datetime="2023-08-01">May 2024</time> - Aug 2024</h4>
        <ul>
            <li>&bull; Closed over 100 feature request tickets by efficiently diagnosing and resolving user-reported issues, contributing to faster product iterations and customer satisfaction.</li>
            <li>&bull; Developed a new runsheet and table builder feature, which optimized data processing times and enhanced user experience with more intuitive controls and expanded customization options</li>
        </ul>
    </div>
    <div class="article">
        <h3>MIT Media Lab, Undergraduate Researcher</h3>
        <h4 class="location">Cambridge, MA <time datetime="2023-08-01">Aug 2023</time> - <time datetime="2023-08-01">Feb 2024</time></h4>
        <ul>
            <li>&bull; Led the creation of a transformer-based embedding conversion method aimed at harmonizing word embeddings from diverse Large Language Models (LLMs), improving modularity and efficiency</li>
            <li>&bull; Expanded existing embedding visualization tools by integrating advanced dimensionality reduction techniques such as PCA, T-SNE, and UMAP, allowing researchers to uncover patterns in high-dimensional data with greater clarity.</li>
            <li>&bull; Migrated multi-gigabyte embeddings into a high-performance vector database, boosting query efficiency by 40% and enabling real-time data exploration for large datasets.</li>
        </ul>
    </div>
    <div class="article">
        <h3>Velvet Financial Services, Junior Software Engineer</h3>
        <h4 class="location">Salt Lake City, UT <time datetime="2022-05-01">May 2022</time> - <time datetime="2023-08-01">Aug 2023</time></h4>
        <ul>
            <li>&bull; Developed and deployed over 50 mobile-responsive web pages as part of the final website, contributing to a seamless and user-friendly online experience across various devices.</li>
            <li>&bull; Utilized a full stack skill set for front-end (HTML, CSS, JavaScript) and back-end (Node.js, Python) development.</li>
            <li>&bull; Aided the creation of an AI tool streamlining investment onboarding, automating document parsing, data extraction, and listing generation.</li>
        </ul>
    </div>
    <div class="article">
        <h3>MIT Physics, Undergraduate Teaching Assistant</h3>
        <h4 class="location">Cambridge, MA <time datetime="2022-08-01">Aug 2022</time> - <time datetime="2022-12-01">Dec 2022</time></h4>
        <ul>
            <li>&bull; Served as one of four teaching assistants in a hands-on course with 60 students, meeting three times a week; prepared lesson materials and participated in coordinated planning meetings.</li>
            <li>&bull; Organized and led voluntary study sessions before each midterm, enhancing student preparation and deepening my own understanding of the material.</li>
        </ul>        
    </div>
    <div class="article">
        <h3>Nanny</h3>
        <h4 class="location">Salt Lake City, UT <time datetime="2020-06-01">June 2020</time> - <time datetime="2021-08-01">Aug 2021</time></h4>
        <ul>
            <li>&bull; Provided full-time childcare for two boys during the COVID-19 pandemic</li>
        </ul>
    </div>
    <div class="article">
        <h3>Freelance Tutor</h3>
        <h4 class="location">Salt Lake City, UT <time datetime="2018-09-01">Sept 2018</time> - <time datetime="2021-08-01">Aug 2021</time></h4>
        <ul>
            <li>&bull; Accumulated over 150 hours of one-on-one tutoring with students aged 6 to 18.</li>
            <li>&bull; Tutored subjects including Calculus, Statistics, Economics, Physics, Chemistry, Spanish, LSAT Logic, ACT Prep, and elementary-level reading and math</li>
            <li>&bull; Helped students achieve high scores, including 5s on AP exams and 34 on the ACT</li>
        </ul>
    </div>
</div>
<div class="section">
    <h2>Skills</h2>
    <div class="article">
        <ul>
            <li><b>Programming:</b> Python, React, HTML, Go, R, Java, Javascript</li>
            <li><b>Math:</b> Machine Learning, Calculus, Statistics & Probability, Linear Algebra, Discrete Math, Differential Equations, Optimization</li>
            <li><b>World Languages:</b> Fluency in English, Spanish, and Serbian</li>
            <li><b>Software:</b> Github, Docker, Pandas, Tableau, Scikit, Linear, Figma (design), Material UI, PyTorch, LaTex</li>
        </ul>
    </div>
</div>