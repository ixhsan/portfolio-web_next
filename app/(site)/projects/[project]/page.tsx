import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import React from "react";

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

type ReactChildren = { children: React.ReactNode };

function replaceBulletPoints(input) {
  // Split the input string by "\tb"
  const parts = input.split("\\tb");

  // Initialize an empty string to store the result
  let result = "";

  // Loop through each part and concatenate with the appropriate indentation and bullet point
  parts.forEach((part, index) => {
    // If the index is greater than 0, add a newline character
    if (index > 0) {
      result += "\n";
    }

    // Add indentation based on the number of "\t" characters in the part
    const indentation = part.split("\t").length - 1;

    // Add bullet point(s) with the appropriate indentation
    if (indentation > 0) {
      result += "\t".repeat(indentation);
    }
    result += "• ";

    // Add the remaining part (excluding the "\t" characters)
    result += part.trim();
  });

  return result;
}

const components = {
  block: {
    // Ex. 1: customizing common block types
    blockquote: ({ children }: ReactChildren) => (
      <blockquote className="border-l-purple-500 mt-4">{children}</blockquote>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: ReactChildren) => (
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
