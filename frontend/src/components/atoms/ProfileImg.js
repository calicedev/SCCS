import React, { useState } from "react";

function ProfileImg() {
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");

  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  return (
    <>
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <td>
              <div>
                {fileImage && (
                  <img
                    alt="sample"
                    src={fileImage}
                    style={{ margin: "auto" }}
                  />
                )}
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    name="imgUpload"
                    type="file"
                    accept="image/*"
                    onChange={saveFileImage}
                  />

                  <button
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      width: "55px",
                      height: "40px",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteFileImage()}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ProfileImg;