"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { firestore } from "@/firebase";
import { Box, Modal, Typography, Stack, TextField, Button, AppBar, Toolbar } from "@mui/material";
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [page, setPage] = useState("home");

  const updateInventory = async () => {
    const inventoryQuery = query(collection(firestore, "inventory"));
    const snapshot = await getDocs(inventoryQuery);
    const inventoryList = [];

    snapshot.forEach(doc => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      });
    });

    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  useEffect(() => {
    if (page === "track") {
      updateInventory();
    }
  }, [page]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Smart Pantry
          </Typography>
          <Box display="flex" flexGrow={1} justifyContent="flex-end">
            <Button color="inherit" onClick={() => setPage("home")}>Home</Button>
            <Button color="inherit" onClick={() => setPage("track")}>Track</Button>
            <Button color="inherit" onClick={() => setPage("contact")}>Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>

    
      {page === "home" && (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
    <Typography variant="h1">Welcome to Pantry Tracker</Typography>
    <Typography variant="body1">The pantry tracker manages supplies, optimizes food usage, and ensures efficient organization by keeping track of item quantities.</Typography>
    <Button 
      variant="outlined" 
      style={{ borderColor: "dodgerblue", color: "dodgerblue", marginTop: "20px"}} 
      onClick={() => setPage("track")}
    >
      Start Tracking
    </Button>
    {/* <img 
      src="https://www.thespruce.com/thmb/klPQy_QIpRVaN3WZb9ZTjJ85eys=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1453229786-90547add346b45cab3c90dd0c518c5d4.jpg" 
      alt="Pantry Image" 
      width="100%" 
      height="50%" 
    /> */}
  </Box>
)}

      {/* {page === "home" && (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
          <Typography variant="h1">Welcome to Pantry Tracker</Typography>
           <Typography variant="p">The pantry tracker manages supplies, optimizes food usage, and ensures efficient organization by keeping track of item quantities.</Typography>
           <Button  variant="outlined" color="dodgerblue" onClick={() => setPage("track")}>Start Tracking</Button>
        

        </Box>
      )} */}

      {page === "track" && (
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Modal open={open} onClose={handleClose}>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              width={400}
              bgcolor="white"
              border="2px solid #000"
              boxShadow={24}
              p={4}
              display="flex"
              flexDirection="column"
              gap={3}
              sx={{ transform: 'translate(-50%, -50%)' }}
            >
              <Typography variant="h1">Add Item</Typography>
              <Stack width="100%" direction="row" spacing={2}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={itemName}
                  onChange={(e) => {
                    setItemName(e.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    addItem(itemName);
                    setItemName('');
                    handleClose();
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Box>
          </Modal>
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
            }}
          >
            Add New Item
          </Button>
          <Box border="1px solid #333">
            <Box
              width="800px"
              height="100px"
              bgcolor="ADD8E6"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant='h2' color='#333'>
                Pantry Items
              </Typography>
            </Box>
            <Stack width="800px" height="300px" spacing={2} overflow="auto">
              {
                inventory.map(({ name, quantity }) => (
                  <Box
                    key={name}
                    width="100%"
                    minHeight="150px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    bgcolor='#f0f0f0'
                    padding={5}
                  >
                    <Typography variant='h3' color="#333" textAlign="center">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography variant='h3' color="#333" textAlign="center">
                      {quantity}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={() => {
                          addItem(name);
                        }}
                      >
                        Add
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          removeItem(name);
                        }}
                      >
                        Remove
                      </Button></Stack>
                    </Stack>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Box>
      )}

      {page === "contact" && (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
          <Typography variant="h1">Contact Us</Typography>
          <Typography variant="h6">Email: contact@pantrytracker.com</Typography>
          <Typography variant="h6">Phone: +123 456 7890</Typography>
          <Typography variant="h6">Address: 123 Pantry St, Food City</Typography>
        </Box>
      )}
    </Box>
  );
}
