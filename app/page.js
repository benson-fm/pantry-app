"use client";

import React, { useEffect, useState } from "react";

import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);

  const [open, setOpen] = React.useState(false);

  const [itemName, setItemName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addItem = async (item) => {
    const docRef = doc(firestore, "pantry", item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, {count: docSnap.data().count + 1});
    }
    else {  
      await setDoc(docRef, {count: 1});
    }

    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(firestore, "pantry", item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().count > 1) {
        await setDoc(docRef, {count: docSnap.data().count - 1});
      }
      else {
        await deleteDoc(docRef);
      }
    }
    
    await updatePantry();
  }

  const updatePantry = async () => {
    const snapshot = collection(firestore, "pantry");
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({name:doc.id, ...doc.data()});
    });
    console.log(pantryList);
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
    >
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {" "}
        Add Item{" "}
      </Button>
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
      <Box border={"1px solid #333"}>
        <Box
          width="800px"
          height={"100px"}
          bgcolor={"#Ae1234"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h3" color={"#333"} textAlign={"center"}>
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="500px" spacing={2} overflow={"auto"}>
          {pantry.map(({name, count}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent="space-between"
              paddingX={5}
              alignItems="center"
              bgcolor={"#f0f0f0"}
              color="white"
              fontSize="24px"
            >
              <Typography variant="h3" color={"#333"} textAlign={"center"}>
                {
                  // capitalize the first letter of the item
                  name.charAt(0).toUpperCase() + name.slice(1)
                }
              </Typography>

              <Typography variant="h3" color={"#333"} textAlign={"center"}>
                Quantity: {count}
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeItem(name)}
                >
                Remove
                </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
