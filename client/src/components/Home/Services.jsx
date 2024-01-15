import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import SpeedIcon from "@mui/icons-material/Speed";

const servicesData = [
  {
    icon: <SecurityIcon fontSize="large" color="primary" />,
    title: "Secure Data Storage",
    description: "We provide secure data storage solutions to keep your information safe and confidential.",
  },
  {
    icon: <ContactSupportIcon fontSize="large" color="primary" />,
    title: "24/7 Support",
    description: "Our dedicated support team is available 24/7 to assist you with any issues or questions you may have.",
  },
  {
    icon: <SpeedIcon fontSize="large" color="primary" />,
    title: "Fast and Reliable",
    description: "Experience fast and reliable services to ensure smooth and efficient operations for your business.",
  },
];

function Services() {
  return (
    <Container className="py-5">
      <Grid container spacing={3}>
        {servicesData.map((service, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper elevation={3} className="service-paper shadow">
              {service.icon}
              <Typography variant="h5">{service.title}</Typography>
              <Typography variant="body1">{service.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Services;
