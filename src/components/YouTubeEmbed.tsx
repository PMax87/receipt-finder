import React, { ReactElement } from "react";

type PropsType = {
    embedUrl: string;
};

const YoutubeEmbed = ({ embedUrl }: PropsType): ReactElement => (

<div className="video-responsive">
    <iframe
      className="w-full aspect-video rounded"
      src={embedUrl.replace("watch?v=", "embed/")}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;
