import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Florian Walther and his work.",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <H1>About Me</H1>
      <section className="space-y-3">
        <H2>Who am I?</H2>
        <p>
          My name is W Rainer Flores and I am a self-taught software developer. 
          I am a Civil Engineering Graduate with a passion for Machine Learning, data science and database engineering. Through completing several online courses and acquiring certificates in Data Science Methodology, Tools for Data Science, Python for Data Science, AI & Development, What is Data Science?, and Databases and SQL for Data Science with Python from the IBM Skills Network, I have developed a strong foundation in data science, programming, and database management.

          As a Civil Engineering graduate, I possess strong analytical and problem-solving skills, attention to detail, and project management experience. I am highly motivated to continue learning and expanding my knowledge in the field of database engineering.{" "}
          {/* <a
            href="https://www.youtube.com/codinginflow"
            className="text-primary hover:underline"
          >
            Coding in Flow
          </a>
          . */}
        </p>
        <p>
          {/* I&apos;m passionate about building cool apps and websites and I love
          sharing the things I learn with my audience. */}
        </p>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        {/* <H2>Skills</H2> */}
        <p>
          {/* I&apos;m a full-stack web developer specializing in{" "}
          <strong>React</strong>, <strong>Next.js</strong>, and{" "}
          <strong>Node.js</strong>. */}
        </p>
        <p>
          {/* I also have experience with Android development but have stopped
          working with it a few years ago. I prefer web development because you
          can use a modern website on almost every device and reach the whole
          world with it. */}
        </p>
      </section>
      <hr className="border-muted" />
      {/* <section className="space-y-3">
        <H2>Side projects</H2>
        <p>
          In my free time, I like to work on side projects to keep my skill
          sharp and try out new tech. Here is a list of my current projects:{" "}
        </p>
        <ul className="list-inside list-disc">
          <li>
            <a
              href="https://smartdiary.co"
              className="text-primary hover:underline"
            >
              SmartDiary.co
            </a>{" "}
            - An AI-powered journaling app
          </li>
          <li>
            <Link
              href="https://books-ai.app"
              className="text-primary hover:underline"
            >
              Books-AI.app
            </Link>{" "}
            - An AI book recommendation app
          </li>
        </ul>
      </section>
      <hr className="border-muted" />
      <section className="space-y-3">
        <H2>Hobbies</H2>
        <p>
          Besides programming, I love doing sports. I lift weights and do
          Brazilian Jiu-Jitsu. I also enjoy reading books and going out
          sometimes. I think having hobbies other than coding is important for
          mental health.
        </p>
        <p>
          I&apos;m also very much into self-improvement, nutrition, and positive
          psychology.
        </p>
        <Image
          src={""}
          alt="Brazilian Jiu-Jitsu group photo"
          className="rounded-md"
        />
      </section> */}
    </section>
  );
}
