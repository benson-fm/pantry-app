// "use client";

// import React, { useEffect, useState } from "react";
// import XSymbol from "./assets/close-svgrepo-com.svg";
// import Image from "next/image";
// import "./page.css";
// import IconButton from "@mui/material/IconButton";

// import { firestore } from "@/firebase";
// import {
//   Box,
//   Button,
//   Modal,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   setDoc,
// } from "firebase/firestore";
// import { blueGrey } from "@mui/material/colors";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   display: "flex",
//   flexDirection: "column",
//   gap: 3,
// };

// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#757ce8",
//       main: "#3f50b5",
//       dark: "#002884",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "#ff7961",
//       main: "#f44336",
//       dark: "#ba000d",
//       contrastText: "#000",
//     },
//   },
// });

// export default function Home() {
//   const [pantry, setPantry] = useState([]);

//   const [open, setOpen] = React.useState(false);

//   const [dataOpen, setDataOpen] = React.useState(false);

//   const [itemName, setItemName] = useState("");

//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleDataOpen = (item) => {
//     setSelectedItem(item);
//   };
//   const handleDataClose = () => {
//     setSelectedItem(null);
//     console.log("we did it")
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   }

//   const handleClose = () => {
//     setOpen(false);
//   }

//   const addItem = async (item) => {
//     const docRef = doc(firestore, "pantry", item);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       await setDoc(docRef, { count: docSnap.data().count + 1 });
//     } else {
//       await setDoc(docRef, { count: 1 });
//     }

//     await updatePantry();
//   };

//   const removeItem = async (item) => {
//     const docRef = doc(firestore, "pantry", item);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       if (docSnap.data().count > 1) {
//         await setDoc(docRef, { count: docSnap.data().count - 1 });
//       } else {
//         await deleteDoc(docRef);
//       }
//     }

//     await updatePantry();
//   };

//   const updatePantry = async () => {
//     const snapshot = collection(firestore, "pantry");
//     const docs = await getDocs(snapshot);
//     const pantryList = [];
//     docs.forEach((doc) => {
//       pantryList.push({ name: doc.id, ...doc.data() });
//     });
//     console.log(pantryList);
//     setPantry(pantryList);
//   };

//   useEffect(() => {
//     updatePantry();
//   }, []);

//   return (
//     <Box
//       width={"100vw"}
//       height="100vh"
//       display={"flex"}
//       flexDirection={"column"}
//       justifyContent={"center"}
//       alignItems={"center"}
//       gap={2}
//       bgcolor={blueGrey[900]}
//     >
//       <Typography variant="h1" color={"white"} textAlign={"center"}>
//         Pantry Database
//       </Typography>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Add Item
//           </Typography>
//           <Stack direction="row" spacing={2} width="100%">
//             <TextField
//               id="outlined-basic"
//               label="Item"
//               variant="outlined"
//               fullWidth
//               value={itemName}
//               onChange={(e) => setItemName(e.target.value)}
//             />
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={() => {
//                 addItem(itemName);
//                 handleClose();
//               }}
//             >
//               Add
//             </Button>
//           </Stack>
//         </Box>
//       </Modal>

//       <Box>
//         <Box
//           width="800px"
//           height={"100px"}
//           bgcolor={theme.palette.primary.main}
//           display={"flex"}
//           justifyContent={"center"}
//           alignItems={"center"}
//           sx={{ borderRadius: "15px 15px 0px 0px" }}
//         >
//           <Typography variant="h3" color={"#333"} textAlign={"center"}>
//             Pantry Items
//           </Typography>
//         </Box>
//         <Stack
//           width="800px"
//           height="500px"
//           spacing={2}
//           overflow={"auto"}
//           paddingY={2}
//           className="scrollable-container"
//         >
//           {pantry.map(({ name, count }) => (
//             <Box
//               key={name}
//               width="100%"
//               minHeight="150px"
//               display="flex"
//               justifyContent="center"
//               paddingX={5}
//               alignItems="center"
//               bgcolor={theme.palette.primary.light}
//               color={theme.palette.primary.light}
//               fontSize="24px"
//               borderRadius={4}
//               onClick={() => handleDataOpen({ name, count })}
//             >
//               <Typography variant="h3" color={"#333"} textAlign={"center"}>
//                 {
//                   // capitalize the first letter of the item
//                   name.charAt(0).toUpperCase() + name.slice(1)
//                 }
//               </Typography>
              
//               {selectedItem && (
//                 <Modal
//                   open={!!selectedItem}
//                   onClose={handleDataClose}
//                   aria-labelledby="modal-modal-title"
//                   aria-describedby="modal-modal-description"
//                 >
//                   <Box sx={style}>
//                     <Stack direction="row" spacing={2} width="100%">
//                       <Typography
//                         id="modal-modal-title"
//                         variant="h6"
//                         component="h2"
//                       >
//                         Items: {selectedItem.count}
//                       </Typography>
//                       <IconButton
//                         onClick={handleDataClose}
//                         sx={{
//                           padding: 0,
//                           marginLeft: "auto",
//                           "&:hover": {
//                             bgcolor: "transparent",
//                           },
//                         }}
//                       >
//                         <Image
//                           src={XSymbol}
//                           width={24}
//                           height={24}
//                           alt="Close"
//                         />
//                       </IconButton>
//                     </Stack>
//                   </Box>
//                 </Modal>
//               )}
//               {/* <Typography variant="h3" color={"#333"} textAlign={"center"}>
//                 Quantity: {count}
//               </Typography> */}

//               {/* <Button
//                  sx={{
//                   bgcolor: theme.palette.primary.dark,
//                   color: theme.palette.primary.contrastText,
//                   '&:hover': {
//                     bgcolor: theme.palette.primary.light,
//                   },
//                 }}
//                 onClick={() => removeItem(name)}
//               >
//                 Remove
//               </Button> */}
//             </Box>
//           ))}
//         </Stack>
//       </Box>
//       <Box>
//         <Button variant="contained" color="primary" onClick={handleOpen}>
//           {" "}
//           Add Item{" "}
//         </Button>
//       </Box>
//     </Box>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import XSymbol from "./assets/close-svgrepo-com.svg";
import Image from "next/image";
import "./page.css";
import IconButton from "@mui/material/IconButton";

import { firestore } from "@/firebase";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { blueGrey } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "#2196f3",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [openR, setOpenR] = useState(false);
  const [itemName, setItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenR = () => setOpenR(true);
  const handleCloseR = () => setOpenR(false);

  const handleDataOpen = (item) => setSelectedItem(item);
  const handleDataClose = () => setSelectedItem(null);

  const addItem = async (item) => {
    const docRef = doc(firestore, "pantry", item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { count: docSnap.data().count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }

    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(firestore, "pantry", item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().count > 1) {
        await setDoc(docRef, { count: docSnap.data().count - 1 });
      } else {
        await deleteDoc(docRef);
      }
    }

    await updatePantry();
  };

  const updatePantry = async () => {
    const snapshot = collection(firestore, "pantry");
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  return (
    <Box
      width={"100vw"}
      height="100vh"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      bgcolor={blueGrey[900]}
    >
      <Typography variant="h1" color={"white"} textAlign={"center"}>
        Pantry Database
      </Typography>

      {/* Add Item Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack direction="row" spacing={2} width="100%">
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                addItem(itemName);
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Remove Item Modal */}
      <Modal
        open={openR}
        onClose={handleCloseR}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Remove Item
          </Typography>
          <Stack direction="row" spacing={2} width="100%">
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                removeItem(itemName);
                handleCloseR();
              }}
            >
              Remove
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Pantry Items List */}
      <Box>
        <Box
          width="800px"
          height={"100px"}
          bgcolor={theme.palette.primary.main}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ borderRadius: "15px 15px 0px 0px" }}
        >
          <Typography variant="h3" color={"white"} textAlign={"center"}>
            Pantry Items
          </Typography>
        </Box>
        <Stack
          width="800px"
          height="500px"
          spacing={2}
          overflow={"auto"}
          paddingY={2}
          className="scrollable-container"
        >
          {pantry.map(({ name, count }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent="center"
              paddingX={5}
              alignItems="center"
              bgcolor={theme.palette.primary.light}
              fontSize="24px"
              borderRadius={4}
              onClick={() => handleDataOpen({ name, count })}
            >
              <Typography variant="h3" color={"white"} textAlign={"center"}>
                {
                  // capitalize the first letter of the item
                  name.charAt(0).toUpperCase() + name.slice(1)
                }
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Item Details Modal */}
      {selectedItem && (
        <Modal
          open={!!selectedItem}
          onClose={handleDataClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack display="flex" flexDirection="row" justifyContent="space-between" width="100%">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Count: {selectedItem.count}
              </Typography>
              <IconButton
                onClick={handleDataClose}
                sx={{
                  padding: 0,
                  marginLeft: "auto",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                <Image
                  src={XSymbol}
                  width={24}
                  height={24}
                  alt="Close"
                />
              </IconButton>
            </Stack>
          </Box>
        </Modal>
      )}

      {/* Add Item Button */}
      <Box display="flex" flexDirection={"row"} width="800px" justifyContent={"flex-end"} gap={4}>
        <Button onClick={handleOpen} fontSize="24px" sx={{bgcolor: theme.palette.primary.main, borderRadius: 2, color: "white", height: "50px", width:"100px"}}>
          Add 
        </Button>
        <Button onClick={handleOpenR} fontSize="24px" sx={{bgcolor: theme.palette.primary.main, borderRadius: 2, color: "white", height: "50px", width:"100px"}}>
          Remove 
        </Button>
      </Box>
    </Box>
  );
}
