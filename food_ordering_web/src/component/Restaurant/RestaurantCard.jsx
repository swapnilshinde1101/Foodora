import React from "react";
import { Card, Chip, IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../State/Authentication/Action";
import { isPresentInFavorites } from "../config/logic";

const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleAddToFavorite = () => {
    if (jwt) {
      dispatch(addToFavorite({ restaurantId: item.id, jwt }));
    }
  };

  const handleNavigateToRestaurant = () => {
    if (item.open) {
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    }
  };

  return (
    <Card
      className="w-[18rem] h-[20rem] flex flex-col justify-between overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
    >
      {/* Card Header with Hover Effect */}
      <div
        className={`${item.open ? "cursor-pointer" : "cursor-not-allowed"} relative overflow-hidden rounded-t-lg`}
      >
        {/* Fixed Image Size with Hover Effect */}
        <img
          src={item.images && item.images.length > 0 ? item.images[0] : "/default-restaurant.jpg"}
          alt="Restaurant"
          className="w-full h-[8rem] object-cover transition-transform duration-300 hover:scale-110"
        />

        {/* Open/Closed Chip */}
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? "success" : "error"}
          label={item.open ? "Open" : "Closed"}
        />
      </div>

      {/* Card Content with Hover Transition */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="space-y-1">
          {/* Restaurant Name with Tooltip and Hover Effect */}
          <Tooltip title={item.open ? "" : "Restaurant is currently closed"}>
          <p
  onClick={handleNavigateToRestaurant}
  className="text-lg font-bold cursor-pointer hover:text-primary-500 transition-colors duration-200 truncate"
>
  {item.name}
</p>

          </Tooltip>

          {/* Description (Truncated) */}
          <p className="text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Favorite Button with Hover and Transition */}
        <IconButton
          onClick={handleAddToFavorite}
          disabled={!jwt}
          className="transition-transform duration-200 hover:scale-110"
        >
          {isPresentInFavorites(auth?.favorites ?? [], item) ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </div>
    </Card>
  );
};

export default RestaurantCard;
