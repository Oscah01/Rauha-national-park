import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import logo from "/logo.png";
import lion from "/lion.png";
import elephant from "/elephant.png";
import rhino from "/rhino.png";
import zebra from "/zebra.png";

const WelcomePDF = () => {
  const [imageData, setImageData] = useState({});

  // Converts an image to Base64 format
  const convertToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  // Load all images on component mount
  useEffect(() => {
    const loadImages = async () => {
      const images = await Promise.all([
        convertToBase64(logo),
        convertToBase64(elephant),
        convertToBase64(lion),
        convertToBase64(rhino),
        convertToBase64(zebra),
      ]);

      setImageData({
        logo: images[0],
        elephant: images[1],
        lion: images[2],
        rhino: images[3],
        zebra: images[4],
      });
    };

    loadImages();
  }, []);

  const generatePDF = () => {
    if (!imageData.logo || !imageData.elephant || !imageData.lion) {
      alert("Images are still loading. Please wait...");
      return;
    }

    const doc = new jsPDF();

    // Set default font size
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);

    // Page 1: Add lodge logo at the top
    doc.addImage(imageData.logo, "PNG", 75, 10, 60, 20);

   // Centered Heading "Karibu Sana"
const pageWidth = doc.internal.pageSize.getWidth();
doc.setFontSize(24); // Increase font size to 24
doc.setFont("helvetica", "bold"); // Set font to bold
const textWidth = doc.getTextWidth("Karibu Sana");
doc.text("Karibu Sana", (pageWidth - textWidth) / 2, 50);

// Reset font size and style for the rest of the content
doc.setFontSize(16);
doc.setFont("helvetica", "normal");

    // Welcome Message
doc.text(
    "Welcome to Tungamalenga Lodge and Campsite! Situated in the heart of Ruaha National Park, we are delighted to have you as our guest.\n\n" +
      "If you experience any issues with your room, please don’t hesitate to inform us so we can resolve them quickly.\n\n" +
      "Your comfort is our priority! This guide is designed to provide you with all the information you need for a truly unforgettable stay.",
    10, 65, { maxWidth: 180 }
  );

    // Dining Information
    doc.setFont("helvetica", "bold");
    doc.text("Dining Schedule", 10, 130);

    doc.setFont("helvetica", "normal");
    const meals = [
      { name: "Breakfast", time: "07:00 - 09:00" },
      { name: "Lunch", time: "12:30 - 14:00" },
      { name: " Tea", time: "16:00 - 17:00" },
      { name: "Dinner", time: "19:00 - 21:00" },
    ];

    meals.forEach((meal, index) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${meal.name}:`, 10, 140 + index * 10);
      doc.setFont("helvetica", "normal");
      doc.text(meal.time, 50, 140 + index * 10);
    });

    doc.text(
      "For packed meals or special dietary requests, please inform us the night before. Our Maasai guides will ensure you are safely escorted to the dining area during the evening and early morning hours.",
      10, 180, { maxWidth: 180 }
    );

    // Add animal image at the bottom (elephant for page 1)
    doc.addImage(imageData.elephant, "JPEG", 65, 250, 80, 50);

    // Page 2: Add new page
    doc.addPage();

    // Add lodge logo at the top of the second page
    doc.addImage(imageData.logo, "PNG", 75, 10, 60, 20);

    // Add new section for additional details
    doc.setFont("helvetica", "bold");

    // Drinking Water
    doc.text("Drinking Water", 10, 50);

    doc.setFont("helvetica", "normal");
    doc.text(
      "The tap water in your banda is not safe for drinking. We provide complimentary bottled water in your room for your convenience and safety.",
      10, 60, { maxWidth: 180 }
    );

    // Bar
    doc.setFont("helvetica", "bold");
    doc.text("Bar", 10, 90);

    doc.setFont("helvetica", "normal");
    doc.text(
      "To keep track of your drinks, please sign for them each evening. All bar bills can be settled upon your departure.\n\n" +
        "We accept Visa, Mastercard (with a 5% surcharge), and cash in Tanzanian Shillings, US Dollars, Euros, or Pounds.\n\n" +
        "All drinks must be purchased from the bar. If you have a special wine or spirit preference, please speak to the manager about corkage fees.",
      10, 100, { maxWidth: 180 }
    );

    // Hot Water
    doc.setFont("helvetica", "bold");
    doc.text("Hot Water", 10, 160);

    doc.setFont("helvetica", "normal");
    doc.text(
      "Our hot water system is powered by solar energy. If the water isn't hot immediately, let it run for a few minutes to warm up.\n\n" +
        "Please note that hot water availability in the early morning may be limited due to weather conditions.",
      10, 170, { maxWidth: 180 }
    );

    // Add animal image at the bottom (lion for page 2)
    doc.addImage(imageData.lion, "JPEG", 65, 250, 80, 50);

    // Page 3: Add new page
    doc.addPage();

    // Add lodge logo at the top of the third page
    doc.addImage(imageData.logo, "PNG", 75, 10, 60, 20);

    // Add new section for Laundry, Security, Fire Safety, and Day of Departure
    doc.setFont("helvetica", "bold");

    // Laundry
    doc.setFont("helvetica", "bold");
    doc.text("Laundry", 10, 50);

    doc.setFont("helvetica", "normal");
    doc.text(
      "We offer a free laundry service for your convenience. Simply place your clothes in the laundry basket provided in your banda.\n\n" +
        "Please note that laundry is sun-dried, so processing times may vary depending on the weather.",
      10, 60, { maxWidth: 180 }
    );

    // Security
    doc.setFont("helvetica", "bold");
    doc.text("Security", 10, 100);

    doc.setFont("helvetica", "normal");
    doc.text(
      "Each room is equipped with a safe for storing valuables. We kindly ask that you do not leave high-value items unattended in public areas.",
      10, 110, { maxWidth: 180 }
    );

    // Fire Safety
    doc.setFont("helvetica", "bold");
    doc.text("Fire Safety", 10, 130);

    doc.setFont("helvetica", "normal");
    doc.text(
      "Smoking is strictly prohibited inside the rooms. An ashtray is provided on the veranda for your use.\n\n" +
        "In the event of a fire, a continuous loud horn will sound. If you hear this alarm, please proceed to the car park immediately.",
      10, 140, { maxWidth: 180 }
    );

    // Day of Departure
    doc.setFont("helvetica", "bold");
    doc.text("Day of Departure", 10, 180);

    doc.setFont("helvetica", "normal");
    doc.text(
      "Check-out time is at 10:00 AM unless prior arrangements have been made.\n\n" +
        "If you would like to leave a gratuity for the staff, a tip box is available at the bar. All tips are distributed equally among the team.",
      10, 190, { maxWidth: 180 }
    );

    // Add animal image at the bottom (rhino for page 3)
    doc.addImage(imageData.rhino, "JPEG", 65, 250, 80, 50);

    // Page 4: Add new page
    doc.addPage();

    doc.save("Welcome_Tungamalenga_Lodge_and_Camp.pdf");
  };

  return (
    <button className="cta-btn" onClick={generatePDF}>
      Download Welcome Guide
    </button>
  );
};

export default WelcomePDF;