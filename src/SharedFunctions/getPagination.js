const getPagination = (page, limit, list) => {
    const min = page * limit - limit;
    const max = min + limit - 1;
    return list.filter((item, index) => index >= min && index <= max);
  };

export default getPagination