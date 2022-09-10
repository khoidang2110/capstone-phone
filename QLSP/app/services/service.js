function Service() {
    this.getListPhone = function () {
      return axios({
        url: "https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/phone/",
        method: "GET",
      });
    };
  
    this.deletePhoneApi = function (id) {
     return axios({
          url:"https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/phone/" + id,
          method: "DELETE",
      });
    };
  
    this.addPhoneApi = function(phone){
      return axios({
          url:"https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/phone/",
          method: "POST",
          data: phone,
      });
    };
    this.getPhoneById = function(id){
      return axios({
          url:`https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/phone/${id}`,
          method: "GET",
      });
    };
    this.updatePhoneApi = function(phone){
      return axios({
          url:`https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/phone/${phone.id}`,
          method:"PUT",
          data:phone,
      });
      
    };
  }
  