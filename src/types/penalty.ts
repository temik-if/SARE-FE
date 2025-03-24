export interface IPenaltyCreate {
    user_id: string; 
    description: string;
    duration: number;
  }

  export interface IPenaltyUpdate {
    description: string; 
    duration: number; 
  }


  export interface IPenalty {
    id: number; 
    user_id: string;
    description: string; 
    duration: number; 
    start_date: string; 
    end_date: string; 
    createdAt: string;
    updatedAt: string;
  }