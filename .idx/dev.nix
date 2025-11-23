{ pkgs, ... }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
  ];
  env = {};
  idx = {
    extensions = [
      "bradlc.vscode-tailwindcss"
      "esbenp.prettier-vscode"
    ];
    workspace = {
      onCreate = {
        npm-install = "cd frontend && npm install";
      };
      onStart = {
        run-server = "cd frontend && npm start -- --port $PORT --host 0.0.0.0";
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          # Usamos sh -c para poder pasar la variable de entorno PORT
          command = ["/bin/sh" "-c" "PORT=$PORT npm start"];
          cwd = "frontend";
          manager = "web";
        };
      };
    };
  };
}