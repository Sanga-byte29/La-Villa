export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset",  "upload-image");
    formData.append("cloud_name", "dci2bi1ig")
    const url = `https://api.cloudinary.com/v1_1/dci2bi1ig/image/upload`;
  
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("something went wrong");
    }
  
    const data = await response.json();
    return data.secure_url;
  };