import Loading from "../Loading/Loading";

interface StatusDetermineProps {
  isLoading: boolean;
  isError: boolean;
  data: any;
}

const StatusDetermine: React.FC<StatusDetermineProps> = ({
  isLoading,
  isError,
  data,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return null;
};

export default StatusDetermine;
