import React from "react";
import { motion } from "framer-motion";
import { FindFileType } from "../../utils/utilities";
import { transformImage } from "../../utils/utilities";

const MessageComponent = ({ msg, loggedUser }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${
          msg.sender._id === loggedUser._id ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[80%] md:max-w-[60%] p-3 rounded-lg ${
            msg.sender._id === loggedUser._id
              ? "bg-green-500 dark:bg-[#00A3FF] text-white"
              : "bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200"
          } shadow-md backdrop-blur-sm`}
        >
          {
            msg.sender._id !== loggedUser._id && (<p className="text-xs mb-1 dark:text-green-500 text-blue-600">{msg.sender.userName}</p>)
          }
          {msg.content && <p className="text-sm md:text-base">{msg.content}</p>}

          {msg.attachments && msg.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {msg.attachments.map((attachment, index) => {
                //finding out the type of the file and displaying it accordingly
                const fileType = FindFileType(attachment.url);

                return (
                  <div key={index} className="max-w-[200px] max-h-[200px]">
                    {fileType === "image" && (
                      <a
                        href={attachment.url}
                        download={attachment.url}
                        target="_blank"
                      >
                        <img
                          src={transformImage (attachment.url,200)}
                          alt="attachment"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </a>
                    )}
                    {fileType === "video" && (
                      <video
                        src={attachment.url}
                        controls
                        preload="none"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    {fileType === "audio" && (
                      <audio
                        src={attachment.url}
                        controls
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    {fileType === "file" && (
                      <a
                        href={attachment.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white  hover:underline"
                      >
                        {attachment.url.split(".").pop()} File
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-[10px] md:text-xs mt-1 opacity-70">
            {new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default MessageComponent;
