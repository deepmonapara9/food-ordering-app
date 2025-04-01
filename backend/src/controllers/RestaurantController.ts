import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurants = async (req: Request, res: Response) => {
  try {
    // get the city from the request parameters
    const city = req.params.city;

    // get the search query from the request query parameters or set it to an empty string
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOptions as string) || "lastUpdated";

    // get the page number from the request query parameters or set it to 1
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    // mumbai = Mumbai (case-insensitive)
    // here we are using a regular expression to make the search case-insensitive and partial match
    query["city"] = new RegExp(city, "i");

    // if the search query is not empty, add it to the query object to search the restaurant name
    const cityCheck = await Restaurant.countDocuments(query);
    if (cityCheck === 0) {
      res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
      return;
    }

    // if the search query is not empty, add it to the query object to search the restaurant name
    if (selectedCuisines) {
      // split the selectedCuisines string by comma and create a regular expression for each cuisine
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      // add the cuisines array to the query object to search the cuisines
      query["cuisines"] = { $all: cuisinesArray };
    }

    // this will be used to sort the restaurants based on the sortOptions query parameter value (lastUpdated or rating)
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");

      // search the restaurant name or cuisines with the search query
      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    // this will show the 10 restaurants per page
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // find the restaurants based on the query object and sort them based on the sortOption
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    // get the total number of restaurants based on the query object
    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize), // 50 results, pageSize = 10, 50/10 = 5 pages
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json([]);
  }
};

export default {
  searchRestaurants,
};
