import React from "react";
import Swal from "sweetalert2";
import { Result, Button } from "antd";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Lỗi tải component:", error, errorInfo);
    Swal.fire({
      icon: "error",
      title: "Lỗi tải nội dung",
      text: "Không thể tải component. Vui lòng thử lại!",
      confirmButtonText: "OK",
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Lỗi tải nội dung"
          subTitle="Không thể tải component. Vui lòng thử lại sau."
          extra={
            <Button
              type="primary"
              onClick={() => window.location.reload()}
            >
              Tải lại trang
            </Button>
          }
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
