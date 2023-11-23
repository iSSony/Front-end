export const convertToEmbedLink = (inputLink: string): string | null => {
  // Check if the input link is already an embedded link
  if (inputLink.includes("/embed/") || inputLink.includes("embedded=true")) {
    return inputLink;
  }

  // Check if the input link is a YouTube video link
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = inputLink.match(youtubeRegex);

  // Check if the input link is a Google Form link
  const googleFormRegex =
    /(?:https?:\/\/)?(?:www\.)?docs\.google\.com\/forms\/d\/e\/([a-zA-Z0-9_-]+)\/viewform/;
  const googleFormMatch = inputLink.match(googleFormRegex);

  // Handle YouTube video link
  if (youtubeMatch && youtubeMatch[1]) {
    return "https://www.youtube.com/embed/" + youtubeMatch[1];
  }
  // Handle Google Form link
  else if (googleFormMatch && googleFormMatch[1]) {
    return (
      "https://docs.google.com/forms/d/e/" +
      googleFormMatch[1] +
      "/viewform?embedded=true"
    );
  } else {
    return null;
  }
};
