import React, { useState, useRef, FormEvent, ChangeEvent } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  postcode: string;
  address: string;
  service: string;
  product: string;
}

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    postcode: "",
    address: "",
    service: "",
    product: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const filesRef = useRef<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to array and limit to 4 files
      const selectedFiles = Array.from(e.target.files).slice(0, 4);
      filesRef.current = selectedFiles;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("message", form.message);
      formData.append("postcode", form.postcode);
      formData.append("address", form.address);
      formData.append("service", form.service);
      formData.append("product", form.product);
      // Append image files
      filesRef.current.forEach((file) => {
        formData.append(`images`, file);
      });

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error enviando formulario");

      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        postcode: "",
        address: "",
        service: "",
        product: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
        Enquire For Measures & Quotes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name*"
          className="p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Your Number*"
          className="p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email*"
          className="p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        />
        <input
          type="text"
          name="postcode"
          value={form.postcode}
          onChange={handleChange}
          placeholder="Postcode"
          className="p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
      <input
        type="text"
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Your Address"
        className="p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="p-4 rounded-lg border border-gray-300 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        >
          <option>Choose Your Service</option>
          <option>Measure & Quote</option>
          <option>Installation</option>
          <option>Repair</option>
        </select>
        <select
          name="product"
          value={form.product}
          onChange={handleChange}
          className="p-4 rounded-lg border border-gray-300 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          required
        >
          <option>Choose Your Product</option>
          <option>Roller Blinds</option>
          <option>Roman Blinds</option>
          <option>Venetian Blinds</option>
          <option>Curtains</option>
          <option>Shutters</option>
          <option>Awnings</option>
        </select>
      </div>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your Message"
        className="p-4 rounded-lg border border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        rows={5}
        required
      />
      <div className="mt-6">
        <label className="block text-gray-700 mb-2 font-medium">
          Upload Images (up to 4)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-lg tracking-wide hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        {status === "sending" ? (
          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        ) : null}
        {status === "sending" ? "Sending..." : "Submit"}
      </button>

      {status === "sent" && (
        <p className="mt-4 text-green-600">
          Your message has been sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600">
          An error occurred. Please try again later.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
