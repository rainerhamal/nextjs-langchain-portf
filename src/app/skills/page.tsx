import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media",
  description: "My social media channels and how to work with me.",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <H1>Skills</H1>
      <section className="space-y-3">

        <H2>I. AI and Machine Learning</H2>
        <p><b>LangChain, LangSmith, OpenAI</b></p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Utilized LangChain to build and optimize AI models for intelligent chat applications, enhancing customer interactions and service efficiency.
          </li>
          <li>
            Integrated OpenAI&apos;s APIs to develop and enable sophisticated text generation and understanding.
          </li>
          <li>
            Leveraged LangSmith for managing and deploying AI workflows, streamlining the development process for AI-driven solutions.
          </li>
        </ul>
        <hr className="border-muted" />

        <H2>II. Programming Languages</H2>
        <p>
          <b>Python (Pandas, NumPy, SciPy, MatPlotLib, Seaborn, BeautifulSoup, Streamlit, Chainlit)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Developed data analysis and machine learning models using Python libraries such as Pandas, NumPy, SciPy, MatPlotLib, Seaborn, and BeautifulSoup.
          </li>
        </ul>

        <p>
          <b>JavaScript (NextJS)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Built dynamic and responsive user interfaces with NextJS, ensuring seamless user experiences across different devices.
          </li>
          <li>
            Utilized advanced JavaScript concepts to develop modular and reusable code, improving application maintainability and performance.
          </li>
        </ul>
        <hr className="border-muted" />

        <H2>III. Databases and Data Management</H2>
        <p>
          <b>SQL (SQL Server, MySQL, Oracle, IBM DB2, Supabase, Vercel)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Demonstrated expertise in writing SQL queries to retrieve, manipulate, and aggregate data, providing crucial insights for decision-making processes.
          </li>
          <li>
            Designed and managed relational database schemas, ensuring data integrity and efficient querying.
          </li>
        </ul>

        <p>
          <b>Vector Database (AstraDB), Redis (Upstash)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Employed AstraDB for vector storage, enhancing the capability of handling high-dimensional data for AI applications.
          </li>
          <li>
            Utilized Upstash (Redis) for in-memory caching, ensuring fast data retrieval and improved application performance.
          </li>
        </ul>

        <p>
          <b>Data Wrangling and Analysis</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Performed data formatting, normalization, standardization, and binning to prepare datasets for analysis.
          </li>
          <li>
            Conducted descriptive statistics, data grouping, and correlation analysis to extract meaningful insights from complex datasets.
          </li>
        </ul>
        <hr className="border-muted" />

        <H2>IV. Web Development</H2>
        <p>
          <b>Front-End Development (NextJS, HTML, CSS, SASS, JavaScript, Bootstrap, ReactJS, Material UI, Canva)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Designed and implemented user-friendly interfaces using HTML, CSS, and JavaScript, adhering to modern web standards.
          </li>
          <li>
            Developed responsive web layouts with SASS and Bootstrap, ensuring optimal performance across various devices and screen sizes.
          </li>
          <li>
            Created visually appealing web designs using Canva and integrated them with ReactJS and Material UI for dynamic functionality.
          </li>
        </ul>

        <p>
          <b>Back-End Development (FastAPI, Python, NextJS)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Built robust server-side applications with FastAPI and Python, enabling real-time data processing and communication.
          </li>
          <li>
            Developed server-side scripts using NextJS, facilitating dynamic content generation and seamless interaction with databases.
          </li>
        </ul>
        <hr className="border-muted" />

        <H2>V. Tools and Platforms</H2>
        <p>
          <b>Jupyter (SQLite, SQL Magic, SQLalchemy)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Utilized Jupyter notebooks for interactive data analysis and visualization, integrating SQLite for efficient data management.
          </li>
          <li>
            Employed SQL Magic and SQLalchemy to streamline database operations within Jupyter environments.
          </li>
        </ul>

        <p>
          <b>IBM Cloud (DB2 API, IBM DB2)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Leveraged IBM Cloud services for database management and cloud computing, utilizing DB2 API and IBM DB2 for scalable data solutions.
          </li>
        </ul>

        <p>
          <b>Microsoft Power Platform (PowerApps, Power Automate, Power BI)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Developed custom business applications with PowerApps, automating workflows with Power Automate, and visualizing data insights with Power BI.
          </li>
          <li>
            Enhanced organizational productivity by integrating Office 365 tools with the Microsoft Power Platform.
          </li>
        </ul>

        <p>
          <b>Microsoft SharePoint (SharePoint Framework)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Created and managed SharePoint sites and applications, providing centralized platforms for collaboration and information sharing.
          </li>
        </ul>
        <hr className="border-muted" />

        <p>
          <b>VSCode and GitHub</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Employed VSCode as the primary development environment, leveraging its extensive extensions for efficient coding.
          </li>
          <li>
            Utilized GitHub for version control, collaboration, and continuous integration, ensuring smooth project workflows.
          </li>
        </ul>
        <hr className="border-muted" />

        <H2>VI. Data Integration and Visualization</H2>
        <p>
          <b>Importing Datasets (Python Database APIs)</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Imported and managed datasets using Python Database APIs, ensuring seamless data integration from various sources.
          </li>
        </ul>

        <p>
          <b>Streamlit and Chainlit</b>
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Built interactive data applications with Streamlit, allowing for real-time data visualization and user interaction.
          </li>
          <li>
            Utilized Chainlit for developing chain-based interactive AI applications, enhancing user engagement and functionality.
          </li>
        </ul>
        <hr className="border-muted" />

      </section>
    </section>
  );
}
