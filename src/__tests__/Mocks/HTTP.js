class HTTPMockBuilder {
  get(Aurl, Aparams) {
    return {
      Return: function(AResponse) {
        return {
          called: null,
          get: function (url, params) {
            expect(url).toBe(Aurl);
            expect(params).toEqual(Aparams);
            this.called = true;
            return Promise.resolve(AResponse);
          }
        };
      }
    };
  }

  Return(AResponse) {
    return {
      called: null,
      get: function (url, params) {
        this.called = true;
        return Promise.resolve(AResponse);
      }
    };
  }

  Reject(AResponse) {
    return {
      called: null,
      get: function (url, params) {
        this.called = true;
        return Promise.reject(AResponse);
      }
    };
  }
}

export const HTTP = new HTTPMockBuilder();
