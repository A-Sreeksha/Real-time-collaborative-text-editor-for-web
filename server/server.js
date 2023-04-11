const mongoose = require("mongoose")
const Document = require("./Document")
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/collaborarive_text_editor", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})

const io = require("socket.io")(3001, {
  cors: {
    
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""


io.on("connection", socket => {
  console.log("connected");
  socket.on("get-document", async documentId => {
    console.log("get")
    const document = await findOrCreateDocument(documentId)
    console.log(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return 120;

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}