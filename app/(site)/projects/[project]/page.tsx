import { getProject } from "@/sanity/sanity-utils";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

type Props = {
  params: {
    project: string;
  };
};

type projectChildren = {
  _type: string;
  marks: string[];
  text: string;
  _key: string;
};

const components: PortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500 mt-4">{children}</blockquote>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <li style={{ listStyleType: "disc", marginLeft: "15px" }}>{children}</li>
    ),
  },
};

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project = await getProject(slug);

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-yellow-400 via-green-500 to-blue-600 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold">
          {project.name}
        </h1>

        <a
          href={project.url ? project.url : ""}
          title="View Project"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-grey-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap border-blue-500 hover:bg-blue-500 hover:text-blue-100 transition"
          style={{ border: "1px solid rgb(59,130, 246, 0.5)" }}
        >
          View Project
        </a>
      </header>

      {/**
       * content goes here
       */}

      <div className="text-lg text-gray-700 mt-5">
        <PortableText value={project.content} components={components} />
      </div>

      {/**
       * Image goes here
       */}

      <Image
        src={project.image}
        alt={project.name}
        width={1920}
        height={1080}
        className="mt-10 border-2 border-gray-700 object-cover rounded-xl"
      />
    </div>
  );
}
