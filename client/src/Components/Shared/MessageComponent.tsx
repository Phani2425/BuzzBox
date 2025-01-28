
import { motion } from "framer-motion";
import { FindFileType } from "../../utils/utilities";
import { transformImage } from "../../utils/utilities";
import { File, FileCode, FileSpreadsheet, FileText } from "lucide-react";
import moment from "moment";
import { NewMessage, User } from "@/Types/types";

const MessageComponent = ({ msg, loggedUser } : {msg:NewMessage,loggedUser:User}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex gap-3 items-start ${
          msg.sender._id === loggedUser._id ? "justify-end" : "justify-start"
        }`}
      >

        <div className={`space-y-2 ${
          msg.sender._id === loggedUser._id ? "max-w-[60%]" : "max-w-[70%]"
        }`}>
          {msg.sender._id !== loggedUser._id && (
            <p className="text-xs px-1 dark:text-green-500 text-blue-600">
              {msg.sender.userName}
            </p>
          )}

          <div className={`p-3 rounded-lg break-words ${
            msg.sender._id === loggedUser._id
              ? "bg-green-500 dark:bg-[#00A3FF] text-white"
              : "bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200"
          } shadow-md backdrop-blur-sm`}>
            {msg.content}
            {msg.attachments && msg.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {msg.attachments.map((attachment, index:number) => {
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
                          src={transformImage(attachment.url, 200)}
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
                    {fileType === "raw" && (
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
                        className="flex items-center gap-2 px-3 py-2 bg-gray-700/40 rounded-md hover:bg-gray-700/60 transition-all max-w-[200px]"
                      >
                        {(() => {
                          const extension = attachment.url
                            .split(".")
                            .pop()
                            ?.toLowerCase();

                          switch (extension) {
                            case "pdf":
                              return (
                                <FileText className="w-5 h-5 text-red-400" />
                              );
                            case "doc":
                            case "docx":
                              return (
                                <FileText className="w-5 h-5 text-blue-400" />
                              );
                            case "xls":
                            case "xlsx":
                              return (
                                <FileSpreadsheet className="w-5 h-5 text-green-400" />
                              );
                            case "txt":
                            case "js":
                            case "ts":
                              return (
                                <FileCode className="w-5 h-5 text-yellow-400" />
                              );
                            default:
                              return <File className="w-5 h-5 text-gray-400" />;
                          }
                        })()}
                        <div className="flex flex-col text-sm overflow-hidden">
                          <span className="truncate">
                            {attachment.url.split("/").pop()?.split(".")[0]}
                          </span>
                          <span className="text-xs text-gray-400">
                            .{attachment.url.split(".").pop()?.toLowerCase()}
                          </span>
                        </div>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          </div>

          <p className={`text-xs text-gray-500 dark:text-gray-400 ${
            msg.sender._id === loggedUser._id ? "text-right mr-2" : "ml-2"
          }`}>
            {moment(msg.createdAt).fromNow()}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default MessageComponent;