export interface Authority {
    authority: string;
  }
  
  export interface UserInterface {
    idUser: number;
    name: string;
    email: string;
    password: string;
    role: string;
    score: number;
    rewardValue?: number;
    enabled: boolean;
    username: string;
    authorities: Authority[];
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
  }
  