import Layout from "../../components/app/layout";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "@/providers/axios-provider";

const HomePage = () => {
  const [lng, i18n] = useTranslation("global");

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  //  ! gpt

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title || !description) {
      setMessage("Please provide all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post("/post", formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error uploading data.");
    }
  };

  return (
    <Layout>
      <p>{lng("home.body")}</p>
      <Button onClick={() => handleChangeLanguage("en")}>English</Button>
      <Button onClick={() => handleChangeLanguage("kh")}>Khmer</Button>
      {/*  */}
      <div>
        <h1>Upload Image with Title and Description</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </Layout>
  );
};

export default HomePage;
