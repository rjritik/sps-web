import { useState } from "react";

/**
 * Custom hook to manage file uploads.
 *
 * @param {number} maxFiles - Maximum number of files allowed to upload.
 * @returns {Object} - File upload state and handler functions.
 */
const useFileUpload = (maxFiles = 5) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [attachments, setAttachments] = useState([]);

  /**
   * Uploads a single file to the server.
   *
   * @param {File} file - File object to upload.
   * @returns {Promise<Object>} - Result of the upload.
   */
  const uploadFile = async (file) => {
    if (attachments.length >= maxFiles) {
      const error = `Maximum ${maxFiles} files allowed`;
      setUploadError(error);
      return { success: false, error };
    }

    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("images", file);

    try {
      const response = await fetch("http://15.206.194.208:5001/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      const newUrls = [...attachments, ...data.urls];
      setAttachments(newUrls);
      return { success: true, urls: newUrls };
    } catch (error) {
      const errorMsg = error?.message || "Unknown error";
      setUploadError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Removes a file URL from the attachments state.
   *
   * @param {string} urlToRemove - URL to remove.
   * @returns {Array} - Updated attachments list.
   */
  const removeAttachment = (urlToRemove) => {
    const updated = attachments.filter((url) => url !== urlToRemove);
    setAttachments(updated);
    return updated;
  };

  return {
    attachments,
    isUploading,
    uploadError,
    uploadFile,
    removeAttachment,
    setAttachments,
  };
};

export default useFileUpload;
