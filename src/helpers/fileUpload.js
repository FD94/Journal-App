export const fileUpload = async (file) => {
  if (!file) throw new Error("El archivo no existe");

  const cloudurl = "https://api.cloudinary.com/v1_1/dglq3hd4o/upload?";

  const formData = new FormData();
  formData.append("upload_preset", "react-projectjournal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudurl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo subir imagen ");

    const cloudResp = await resp.json();
    console.log({ cloudResp });
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.menssage);
  }
};
