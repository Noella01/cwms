const handleLogin = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); // parse JSON

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};


