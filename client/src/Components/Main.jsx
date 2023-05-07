import React from "react";

function Main() {
  return (
    <div className="grid my-5 gap-2 grid-2 grid-cols-[2fr_1fr] overflow-hidden">
      <div className="">
        <div>
          <img
            className="aspect-square object-cover cursor-pointer"
            src={
              "https://cdn.hashnode.com/res/hashnode/image/upload/v1662773800861/eLShZzIuy.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
            }
          />
        </div>
      </div>

      <div className="grid">
        <img
          className="aspect-square object-cover cursor-pointer"
          src={
            "https://cdn.hashnode.com/res/hashnode/image/upload/v1662282597371/YkqSfB5Ro.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
          }
        />

        <div className="overflow-hidden ">
          <img
            className="aspect-square relative top-2 object-cover cursor-pointer"
            src={
              "https://cdn.hashnode.com/res/hashnode/image/upload/v1661766766915/qQyacGdM9.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
