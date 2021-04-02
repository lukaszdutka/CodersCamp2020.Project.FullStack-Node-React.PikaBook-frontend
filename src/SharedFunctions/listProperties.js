const listProperties = (list) => {
    list.map((singleProperty, index) => {
      if (index < list.length - 1) return singleProperty + ", ";
      return singleProperty;
    });
  };

  export default listProperties