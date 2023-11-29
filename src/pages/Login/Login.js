import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function App() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!formData.email || !formData.password) {
      setMessage('Vui lòng nhập địa chỉ email và mật khẩu');
      return;
    }
    setMessage('');
  
    try {
      const response = await fetch('http://localhost:9999/users');
      const data = await response.json();
  
      const user = data.find(
        (user) => user.email === formData.email && user.password === formData.password
      );
  
      if (user) {
        if (user.status === 'active') {
          // Đăng nhập thành công và tài khoản đang ở trạng thái "active", chuyển hướng tới '/home'
          navigate('/home');
        } else {
          setMessage('Tài khoản đã bị khóa.');
        }
      } else {
        setMessage('Người dùng không tồn tại hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      setMessage('Đã xảy ra lỗi khi đăng nhập.');
      console.error(error);
    }
  };

  const handleToggle = (isSignIn) => {
    if (containerRef.current) {
      if (isSignIn) {
        containerRef.current.classList.remove("sign-up-mode");
      } else {
        containerRef.current.classList.add("sign-up-mode");
      }
    }
  };

  return (
    <div className="container" ref={containerRef}>
      {/* ... Form Sign Up ... */}

      <div className="form-container sign-in">
        <Form>
          <h1>Sign In</h1>
          {/* ... Social Icons ... */}
          <span>or use your email password</span>
          {message && <Alert variant="danger">{message}</Alert>}
          <Form.Group controlId="email">
            <Form.Label>Email<span style={{color: "red"}}>*</span></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password<span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </Form.Group>
          <Button
            style={{ margin: '12px 160px' }}
            variant="primary"
            type="button"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <a href="#">Forget Your Password?</a>
        </Form>
      </div>

      {/* ... Toggle Container ... */}
    </div>
  );
}