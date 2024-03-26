// Create document or insert a document
const createDocument = async () => {
  try {
    const pj1 = new Projectmodel({
      key: 1,
      img: "../assets/project1.jpg",
      alt: "project1",
      title: "Project One",
    });
    const pj2 = new Projectmodel({
      key: 2,
      img: "../assets/project2.jpg",
      alt: "project2",
      title: "Project Two",
    });
    const pj3 = new Projectmodel({
      key: 3,
      img: "../assets/project3.jpg",
      alt: "project3",
      title: "Project Three",
    });

    const result = await Projectmodel.insertMany([pj1, pj2, pj3]);
    console.log(result);
  } catch (error) {
    console.error("error", error);
  }
};

createDocument();
