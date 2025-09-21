import { Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material";

export default function AdminDrawer({ open, onClose, menuItems, selectedMenu, onSelect }) {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
    >
      <List>
        {menuItems.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={selectedMenu === text}
              onClick={() => {
                onSelect(text);
                onClose();
              }}
            >
              <ListItemText primary={text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
