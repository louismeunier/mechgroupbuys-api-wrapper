# ⌨️ mechgroupbuys API wrapper 

This is a *updated* wrapper of https://mechgroupbuys.com, programmed to be far more efficient than [my previous attempt](https://github.com/louismeunier/mechgroupbuys-api). Rather than using a webscraper, which proved to be incredibly slow, I used a proxy to find the address of the mechgroupbuy server (https://mechgroupsbuys.com/gb-data). This repository simply wraps this all-encompasing endpoint and separates the result JSON in to categories based on product type and time available.

*I am not associated with www.mechgroupbuys.com AT ALL. If you would like me to take down this API let me know.*

## use 
 `GET https://mechgroupbuyswrapper.herokuapp.com/:type?status=:status`


 > `type`: the product type; either `keycaps`, `keyboards`, or `switches`

  >`status`: the availabilty of the product; either `live`, `upcoming`, `ic` (ie interest check), or `ended`

Any request will return JSON. Requests to the base url will redirect to https://mechgroupsbuys.com/gb-data.